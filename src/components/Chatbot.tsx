// src/components/Chatbot.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, User, Send, X, Loader2, AlertTriangle } from 'lucide-react';
// Import your project's data to give context to the AI
import { glossary, categoriesData, agentExamplesData, visionStatementData, crossCuttingComponentsData } from '../data'; // Adjust path if needed

// --- Interfaces for message structure ---
interface Message {
  role: 'user' | 'assistant' | 'system'; // Keep 'system' for potential future use, though not displayed
  content: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Generates the Project Context Summary ---
const generateFrameworkContext = (): string => {
  let context = `You are a helpful assistant embedded in a web application explaining the "Unified AI Framework".
This framework is a blueprint for an advanced, integrated AI ecosystem. Your goal is to answer user questions about this specific framework based *only* on the information provided below and your general knowledge for clarification. Be concise and helpful. If the information isn't provided, state that the framework details don't cover that specific point. Keep answers focused on the framework described.

Framework Vision:
${visionStatementData.missionStatement}

Core Capabilities (Summaries):
${categoriesData.map(c => `- ${c.title}: ${c.summary}`).join('\n')}

Enabling Principles (Summaries):
${crossCuttingComponentsData.map(c => `- ${c.title}: ${c.explanation}`).join('\n')}

Agent Examples (Roles):
${agentExamplesData.map(a => `- ${a.name}: ${a.role}`).join('\n')}

Key Glossary Terms:
${Object.entries(glossary)
    .slice(0, 20) // Limit glossary items slightly for context size
    .map(([term, def]) => `- ${term}: ${def.split('.')[0]}.`) // Take first sentence
    .join('\n')}
[End of Provided Framework Information]`;

  // Basic check to keep context size reasonable for the API
  const MAX_CONTEXT_LENGTH = 8000; // Adjust if needed
  if (context.length > MAX_CONTEXT_LENGTH) {
      context = context.substring(0, MAX_CONTEXT_LENGTH) + "... [Context Truncated]";
  }
  return context;
};


// --- The Chatbot Component ---
const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Track if the initial context has been sent to the backend
  const [isContextSent, setIsContextSent] = useState(false);

  // Generate the project context once using useMemo
  const systemPromptText = React.useMemo(() => generateFrameworkContext(), []);

  // Helper to scroll down messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]); // Scroll when messages change

  // Reset and focus when chat opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      // Optional: Clear history when opening?
      // setMessages([]);
      // setIsContextSent(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        // Reset context sent flag when closed if not clearing history
        // setIsContextSent(messages.length === 0 ? false : isContextSent);
    }
  }, [isOpen]); // Removed messages dependency here if not clearing

  // --- Handles Sending Message to AI Backend Proxy ---
  const handleSend = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmedInput };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages); // Display user message immediately
    setInputValue('');
    setIsLoading(true);
    setError(null);

    // Prepare data for the backend proxy
    // We only send the conversation history (user/assistant messages)
    const messagesForAPI = currentMessages.filter(m => m.role === 'user' || m.role === 'assistant');

    // Include the systemPrompt text *only if* this is the first message being sent in this session
    const payload = {
      messages: messagesForAPI,
      ...( !isContextSent && { systemPrompt: systemPromptText } ) // Add systemPrompt only for the very first call
    };

    try {
      // --- Call your Netlify Function Endpoint ---
      const response = await fetch('/api/groq-proxy', { // Relative path to trigger redirect
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // --- ------------------------------------ ---

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Invalid response from server.' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const assistantMessage: Message = await response.json(); // Get AI response

      // Add AI response to the chat display
      setMessages((prev) => [...prev, assistantMessage]);
      setIsContextSent(true); // Mark context as sent after the first successful call

    } catch (err: any) {
      console.error('Chat Error:', err);
      setError(`Error: ${err.message || 'Could not connect to chat service.'}`);
      // Optional: remove the user's message if the call failed?
      // setMessages(prev => prev.slice(0,-1));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputValue, isLoading, messages, systemPromptText, isContextSent]); // Dependencies

  // Handle Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  // --- JSX for the Chat Window UI ---
  return (
    <div className="fixed bottom-4 right-4 w-[90vw] max-w-md h-[70vh] max-h-[600px] z-40">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col h-full border border-gray-200 animate-fade-in-fast">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <h3 className="text-lg font-semibold text-indigo-700 flex items-center">
            <Bot className="w-5 h-5 mr-2" /> AI Framework Helper
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {/* Map messages to display them */}
          {messages.map((msg, index) => (
             msg.role !== 'system' && ( // Don't show system prompt in chat
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`p-1.5 rounded-full text-white flex-shrink-0 mx-2 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-indigo-600'}`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      {/* Use whitespace-pre-wrap to respect newlines from the AI */}
                      <div className={`px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'} text-sm whitespace-pre-wrap`}>
                          {msg.content}
                      </div>
                  </div>
              </div>
             )
          ))}
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-full bg-indigo-600 text-white flex-shrink-0"> <Bot size={16} /> </div>
                <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 italic text-sm flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Thinking...
                </div>
              </div>
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="flex justify-center">
              <div className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm flex items-center border border-red-200">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" /> <span>{error}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center space-x-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the framework..."
              className="flex-grow p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm max-h-24 scrollbar-thin scrollbar-thumb-gray-300"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className={`p-2 rounded-md text-white transition-colors ${ isLoading || !inputValue.trim() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1' }`}
              aria-label="Send message" >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;