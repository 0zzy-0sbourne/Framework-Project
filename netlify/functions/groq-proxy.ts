/// <reference types="node" />
// netlify/functions/groq-proxy.ts

import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";
import Groq from 'groq-sdk';

// --- Get API Key from Netlify Environment Variable ---
// IMPORTANT: Set GROQ_API_KEY in your Netlify site's Build & deploy > Environment settings
const groqApiKey = process.env.GROQ_API_KEY;

// --- Initialize Groq SDK (securely on the server) ---
let groq: Groq | null = null;
let initError: string | null = null;

if (!groqApiKey) {
  console.error("FATAL ERROR: Groq API key is missing in Netlify environment variables (GROQ_API_KEY).");
  initError = "Chatbot backend configuration error."; // Keep error generic for client
} else {
  try {
    // This runs on the server, so NO dangerouslyAllowBrowser
    groq = new Groq({ apiKey: groqApiKey });
  } catch (error: any) {
    console.error("Error initializing Groq SDK on server:", error);
    initError = `Failed to initialize chatbot backend: ${error.message}`;
  }
}

// --- The Netlify Function Handler ---
const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {

  // 1. Check Method
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: `Method ${event.httpMethod} Not Allowed` };
  }

  // 2. Check Groq Client Initialization
  if (initError || !groq) {
    console.error("Groq client not initialized. Error:", initError);
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: "Chatbot service is temporarily unavailable." }) };
  }

  // 3. Parse Request Body
  let requestPayload;
  try {
    if (!event.body) throw new Error("Request body is missing.");
    requestPayload = JSON.parse(event.body);
  } catch (e: any) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: `Invalid request body: ${e.message}` }) };
  }

  const { messages, systemPrompt } = requestPayload; // Expect messages history and optional system prompt text

  if (!messages || !Array.isArray(messages)) { // Allow empty messages array initially, but check type
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid request body: messages array is required.' }) };
  }

  // 4. Construct Messages for Groq API - Use the correct type
  let messagesToSend: Groq.Chat.ChatCompletionMessageParam[] = [];

  // If systemPrompt text is provided (meaning it's the first user message)
  // Prepend it to the messages array with the 'system' role.
  if (systemPrompt && typeof systemPrompt === 'string') {
    messagesToSend.push({ role: 'system', content: systemPrompt });
  }

  // Add the actual conversation history (user/assistant messages)
  messagesToSend = messagesToSend.concat(
    messages.filter(m => m.role === 'user' || m.role === 'assistant') // Ensure only valid roles from history
           .map(m => ({ role: m.role, content: m.content })) // Ensure correct format
  );

  // Basic check: don't call API if there are no user/assistant messages after processing
  if (messagesToSend.filter(m => m.role !== 'system').length === 0) {
     return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'No user messages found to send.' }) };
  }


  // 5. Call Groq API (using the structure you provided)
  try {
    console.log(`[groq-proxy] Calling Groq with ${messagesToSend.length} messages. First role: ${messagesToSend[0]?.role}`); // Log for debugging

    const chatCompletion = await groq.chat.completions.create({
      messages: messagesToSend,
      // Choose a model available on Groq Cloud - llama3-70b is powerful
      model: "llama3-70b-8192",
      // Parameters from your example (adjust as needed)
      temperature: 1,
      max_tokens: 1024, // Renamed from max_completion_tokens for Groq SDK usually
      top_p: 1,
      stream: false, // Required for this non-streaming implementation
      stop: null
    });

    const assistantMessage = chatCompletion.choices[0]?.message;

    if (assistantMessage?.content) {
      console.log("[groq-proxy] Received successful response from Groq.");
      // 6. Send Success Response to Frontend
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assistantMessage), // Send the whole message object back
      };
    } else {
      console.error("[groq-proxy] Groq response missing content:", chatCompletion);
      throw new Error('Received an empty or invalid response from the AI model.');
    }

  } catch (err: any) {
    console.error('[groq-proxy] Groq API Error:', err);
    // 7. Send Error Response to Frontend
    // Check if it's a Groq specific error for more details if needed
    // if (err instanceof Groq.APIError) { ... }
    return {
      statusCode: err.status || 502, // Use Groq error status or default to 502 (Bad Gateway),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: `AI model request failed: ${err.message || 'Unknown error'}` }),
    };
  }
};

export { handler }; // Export the handler for Netlify