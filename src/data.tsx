import React from 'react';
import {
  Brain, Cpu, Network, Shield, Zap, Languages,
  GitMerge, Cloud, Server, Award, Users, Eye, Construction, BrainCircuit, FileCode, Hand, SearchCode, Telescope, Bot, Scale, Atom, Landmark, Lock, Blocks, DollarSign, Layers, Workflow, MemoryStick, Microscope, UsersRound, Sparkles, Lightbulb, AlignLeft, // Existing
  TestTube, Recycle, AlertTriangle, Route, BarChart3, BookOpen, ShieldCheck, // New icons based on analysis
} from 'lucide-react';

// --- Updated Interfaces ---
export interface SubComponent {
  id: string;
  title: string;
  explanation: string; // Keep explanations concise here, more detail in main category
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  borderColor: string;
  summary: string;
  purpose: string;
  elevatorPitch: string; // Concise, 1-2 sentence overview
  connections: string;
  methods: string[];
  vitalToAGI: string;
  researchHighlights: string;
  challenges: string[];
  subComponents: SubComponent[];
}

export interface CrossCuttingComponent {
  id: string;
  title: string;
  icon: React.ReactNode;
  explanation: string; // Updated based on analysis document
}

export interface AgentExample {
    id: string;
    name: string;
    icon: React.ReactNode;
    role: string;
    useCase: string;
    keyComponentsUsed: string[]; // List relevant Category IDs, reflecting analysis details
    capabilities: string; // Updated based on analysis
    futureEvolution: string; // Updated based on analysis
    color: string;
    textColor: string;
    borderColor: string;
    scenario?: string;
}

export interface VisionStatement {
    title: string;
    icon: React.ReactNode;
    missionStatement: string; // Updated based on Exec Summary/Conclusion
    keyAims: string[]; // Updated based on Exec Summary/Conclusion
    feasibilitySummary: string; // Concise summary of Section 3 feasibility analysis
}

// --- Glossary (Updated & Expanded) ---
export const glossary = {
    "AGI": "Artificial General Intelligence: AI with human-like cognitive abilities across diverse tasks. Related Terms: MAS, Hybrid, Adaptive Learning",
    "RAG": "Retrieval-Augmented Generation: Enhancing LLM output by retrieving relevant external knowledge. Related Terms: Memory, Hybrid, LLM",
    "RLHF": "Reinforcement Learning from Human Feedback: Training AI using human preferences to guide behavior. Related Terms: Adaptive Learning, Human Data & Alignment",
    "Neuro-symbolic": "Combining neural networks (pattern recognition) with symbolic systems (logic/reasoning). Related Terms: Hybrid, SynthLang, Neuro-Symbolic Communication",
    "LLM": "Large Language Model: AI model trained on vast text data (e.g., GPT-4o). Related Terms: RAG, Hybrid, Adaptive Learning",
    "MAS": "Multi-Agent System: A system composed of multiple interacting autonomous agents. Related Terms: BFT, ZKP, PoT, PoC",
    "FL": "Federated Learning: Training models on decentralized data without moving the data. Related Terms: ZKML, Proof-of-Gradient-Integrity, Privacy",
    "Behavioral Cloning": "Training an AI agent by having it learn directly from observing demonstrations. Related Terms: Human Data & Alignment, Ace Agent",
    "BFT": "Byzantine Fault Tolerance: Ability of a distributed system to function correctly even with faulty or malicious nodes. Related Terms: MAS, Trust, ZKP",
    "ZKP": "Zero-Knowledge Proof: Cryptographic protocol to prove knowledge of information without revealing the information itself. Related Terms: ZKML, ZK-SNARK, Privacy",
    "ZKML": "Zero-Knowledge Machine Learning: Applying ZKPs to verify ML computations or protect data privacy during ML. Related Terms: FL, Proof-of-Gradient-Integrity",
    "Proof-of-Gradient-Integrity": "(Conceptual) Mechanism, potentially using ZKPs/cryptography, to verify the correctness and privacy of shared gradient updates in distributed/federated learning. Related Terms: FL, ZKP, Trust",
    "FEP": "Free Energy Principle: Theoretical framework suggesting adaptive systems minimize prediction errors (surprise) to maintain stability and act purposefully. Related Terms: Active Inference, SDRO, SMiRL",
    "Active Inference": "A process derived from FEP where agents act to minimize the divergence between their expectations and observations. Related Terms: FEP, Adaptive Learning, Active Inference Agent",
    "SDRO": "Surprise-Driven Reinforcement Learning: RL approach using prediction error ('surprise') as an intrinsic reward signal for exploration. Related Terms: FEP, Adaptive Learning",
    "SMiRL": "Surprise Minimization Reinforcement Learning: RL approach inspired by FEP, where agents learn behaviors by seeking predictable states (minimizing surprise). Related Terms: FEP, Adaptive Learning",
    "FPGA": "Field-Programmable Gate Array: Reconfigurable integrated circuit used for hardware acceleration, potentially for real-time ethics checks. Related Terms: Hardware, TEE, Embedded Ethics",
    "Data Lineage": "Tracking the origin, changes, and movement of data throughout its lifecycle, potentially secured on-chain. Related Terms: On-Chain, Blockchain, Trust",
    "SynthLang": "(Proposed) Hyper-efficient, potentially polysynthetic language designed for AI communication, aiming to reduce token usage and ambiguity. Related Terms: Neuro-Symbolic Communication, Hybrid, Polysynthetic Language",
    "LTCN": "Liquid Time-Constant Network: Bio-inspired RNN with dynamic time constants, adept at modeling time-variable data. Related Terms: Memory, HTM, DNC",
    "NAMM": "Neural Attention Memory Model: Technique using learned attention to manage memory (KV cache) efficiently in Transformers, especially for long contexts. Related Terms: Memory, LTCN, DNC",
    "DNC": "Differentiable Neural Computer: Memory-augmented neural network with external read/write memory, capable of handling complex data structures. Related Terms: Memory, LTCN, NAMM",
    "CXL": "Compute Express Link: High-speed CPU-to-device and CPU-to-memory interconnect, crucial for reducing data bottlenecks in AI hardware. Related Terms: Hardware, HBM3",
    "HBM3": "High Bandwidth Memory 3: Type of stacked memory providing high bandwidth, essential for modern AI accelerators. Related Terms: Hardware, CXL",
    "Encoder-Decoder": "Neural network architecture for sequence-to-sequence tasks, potentially unified for multimodal processing. Related Terms: Hybrid, Model Architecture",
    "CLS": "Complementary Learning Systems: Theory (inspired by hippocampus/cortex) suggesting separate fast (episodic) and slow (semantic) learning systems to mitigate catastrophic forgetting. Related Terms: Memory, Catastrophic Forgetting",
    "HTM": "Hierarchical Temporal Memory: Biologically-inspired AI framework modeling neocortex principles for pattern recognition in streaming data. Related Terms: Memory, LTCN",
    "Catastrophic Forgetting": "Tendency of neural networks to forget previously learned information when learning new tasks. Related Terms: CLS, Synthetic Traces, Dynamic Resource Management",
    "Synthetic Traces / Generative Replay": "Using AI to generate artificial data representing past knowledge to mitigate catastrophic forgetting during continual learning. Related Terms: Memory, Catastrophic Forgetting",
    "Dynamic Resource Management": "AI systems adaptively allocating computational or memory resources, e.g., pruning unimportant connections or memories to enable continual learning. Related Terms: Memory, Catastrophic Forgetting",
    "PoT": "Proof-of-Thought: (Conceptual) Blockchain consensus mechanism where rewards are based on the quality/usefulness of an AI agent's contribution. Related Terms: MAS, PoC, Mechanism Design",
    "PoC": "Proof-of-Compute: Mechanism (often blockchain-based) to verify that a computational task was performed correctly, potentially using ZKPs or replication. Related Terms: MAS, PoT, ZKP",
    "On-Chain": "Refers to data or computation stored or executed directly on a blockchain ledger, providing transparency and immutability. Related Terms: Blockchain, Data Lineage",
    "ZK-SNARK": "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge: A specific type of ZKP known for short proofs and fast verification. Related Terms: ZKP, Privacy",
    "TEE": "Trusted Execution Environment: Secure area within a processor that isolates code and data, potentially used for secure AI computation or ethical rule enforcement. Related Terms: Hardware, FPGA, Security",
    "Polysynthetic Language": "Language type with complex words formed by combining many morphemes, enabling high information density (inspiration for SynthLang). Related Terms: SynthLang, Neuro-Symbolic Communication",
    "Mechanism Design": "Branch of economics/game theory focused on designing protocols (e.g., auctions, voting systems) to achieve desired outcomes among self-interested agents. Related Terms: MAS, PoT, PoC",
    "Active Inference Agent": "An AI agent designed based on the principles of Active Inference, acting to minimize prediction errors. Related Terms: Active Inference, FEP, Adaptive Learning",
    "Normative Reasoning": "Reasoning about rules, norms, duties, and permissions; used here for ethical decision-making by AI. Related Terms: Embedded Ethics, Formal Methods",
    "Neuro-Symbolic Communication": "Communication between AIs potentially using a structured, symbolic language (like SynthLang) grounded in neural representations. Related Terms: Hybrid, SynthLang",
};

// --- Revised Data Definitions reflecting analysis document ---

export const visionStatementData: VisionStatement = {
  title: "Vision: Unified, Adaptive, Trustworthy Intelligence Ecosystem",
  icon: <Telescope className="w-7 h-7 text-indigo-600"/>,
  missionStatement: "To build an advanced, integrated AI ecosystem centered on Multi-Agent Systems, Bio-inspired Memory, and Adaptive Learning, establishing robust decentralized coordination with verifiable trust, enabling lifelong learning without catastrophic forgetting, and embedding ethics via hardware/blockchain, fostering a scalable, resilient, and beneficial AI future.", // Derived from Exec Summary
  keyAims: [ // Simplified one-sentence summaries
    "**Multi-Agent Systems:** Decentralized agents with verifiable trust and dynamic task allocation.",
    "**Memory & Knowledge:** Bio-inspired hierarchical memory preventing catastrophic forgetting.",
    "**Learning & Optimization:** Surprise-minimization driving intrinsic motivation and adaptation.",
    "**Ethics & Verification:** Hardware-accelerated ethical checks with blockchain accountability.",
    "**Hybrid Reasoning:** Neural-symbolic integration with efficient agent communication.",
    "**Federated Learning:** Privacy-preserving distributed training with cryptographic security.",
    "**Hardware Foundation:** Specialized accelerators with advanced memory and cooling systems.",
  ],
  feasibilitySummary: "Achieving the full vision is ambitious. An MVP integrating basic versions of all pillars within a specific domain (e.g., smart grid, DeSci) appears feasible in 3-5 years. Key challenges include scaling decentralized trust mechanisms, achieving robust lifelong learning, practical application of FEP, formalizing embedded ethics, and seamless integration of all components. Success depends on interdisciplinary collaboration and leveraging rapid advances in AI, crypto, and hardware.", // Summarized from Analysis Section 3
};


export const categoriesData: Category[] = [
 {
    id: 'mas',
    title: 'Multi-Agent Systems (MAS) & Coordination',
    icon: <Network className="w-6 h-6" />,
    color: 'bg-sky-50', textColor: 'text-sky-800', borderColor: 'border-sky-200',
    summary: 'Enables complex problem-solving via networks of autonomous, decentralized agents coordinating through trust mechanisms (BFT, ZKPs) and dynamic task allocation (auctions).', // Aligned with analysis
    purpose: 'To tackle large-scale, distributed tasks beyond single-agent capabilities, fostering collective intelligence with resilience, transparency, and verifiable interactions.', // Aligned with analysis
    elevatorPitch: 'Decentralized autonomous agents collaborating with verifiable trust for complex problem-solving.',
    connections: 'Leverages **Biologically-Inspired Memory & Knowledge** for shared context/history; agents learn coordination via **Adaptive Learning & Optimization**; uses **Hybrid Neuro-Symbolic Framework** (**SynthLang**) for efficient communication; relies on **Federated & Decentralized Learning** for knowledge sharing & secure updates (PoGI); interacts with **Embedded Ethics & Verification** for rule compliance & accountability; underpinned by **Advanced Hardware & Co-Design**.', // Updated connections
    methods: [ // Updated with analysis details
        'Decentralized Coordination Protocols (e.g., message passing, shared ledger).',
        'Byzantine Fault Tolerant (BFT) Consensus Mechanisms for core reliability.',
        'Zero-Knowledge Proofs (ZKPs / ZKML) for verifiable computation, interaction privacy, and trustworthy attestations (e.g., zkFL).',
        'Proof-of-Gradient-Integrity (Conceptual) for secure FL updates against malicious actors.',
        'Dynamic, Auction-Based Task Allocation (e.g., GCAA, sequential/parallel auctions) managed by orchestrator.',
        'Orchestrator Agents with Cognitive Executive Functions (planning, reasoning, dynamic allocation).',
        'Blockchain for transparent logging, immutable agreements, and potential governance (e.g., ETHOS, EAAC).',
        'Intelligent Consensus Mechanisms (e.g., Proof-of-Thought, Proof-of-Compute) for quality-based rewards/trust.'
    ],
    vitalToAGI: 'Provides scalability, robustness, and verifiable trust for complex collective behavior and an AI "society of mind," capable of emergent problem-solving in decentralized, potentially adversarial environments.', // Updated
    researchHighlights: "Active research integrates MAS with blockchain for trust (e.g., EAAC, BlockAgents). Novel consensus mechanisms (PoT, PoC) reward quality contributions. ZKPs show promise for privacy-preserving verification (zkFL). Auction theory is applied for dynamic task allocation (GCAA).", // Added section
    challenges: [ // Added section based on analysis
        "Scalability limitations of blockchain for large agent networks.",
        "Lack of interoperability standards for diverse agent platforms.",
        "Balancing privacy needs with blockchain transparency (ZKPs are a potential solution but complex).",
        "Designing robust incentive mechanisms (Mechanism Design) to ensure desired collective behavior.",
        "Integration complexity with other pillars (memory, learning, ethics).",
        "Ensuring stability and preventing undesirable emergent behaviors in large systems.", // Added based on general MAS challenges
    ],
    subComponents: [
      { id: 'mas-agents', title: 'Autonomous Agents', explanation: 'Specialized AI agents (WebSurfer, Coder, FileSurfer) that perform specific tasks independently within the multi-agent ecosystem.' },
      { id: 'mas-orchestrator', title: 'Orchestrator Agent', explanation: 'Central cognitive executive (prefrontal cortex function) that coordinates other agents, manages task decomposition, and handles planning.' },
      { id: 'mas-ledgers', title: 'Task & Progress Ledgers', explanation: 'Distributed records for goal management and execution tracking across the agent network.' },
      { id: 'mas-trust', title: 'Byzantine-Resilient Trust Networks', explanation: 'Ensuring reliability using BFT consensus, time-decaying reputation scoring, and ZKPs for verification.' },
      { id: 'mas-pogi', title: 'Proof-of-Gradient-Integrity', explanation: 'zk-SNARKs-based verification of gradient updates in distributed learning to prevent malicious contributions.' },
      { id: 'mas-auction', title: 'Auction-Based Task Allocation', explanation: 'Market-inspired mechanisms for efficient distribution of tasks among specialized agents based on capabilities and availability.' }
    ]
  },
  {
    id: 'memory',
    title: 'Biologically-Inspired Memory & Knowledge',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-violet-50', textColor: 'text-violet-800', borderColor: 'border-violet-200',
    summary: 'Provides AI with persistent, hierarchical, and retrievable knowledge inspired by biological systems (hippocampus-cortex, CLS) to enable lifelong learning and address catastrophic forgetting.', // Updated
    purpose: 'To enable continuous learning, context retention, grounding for reasoning, and adaptation based on past experience, overcoming the limitations of stateless models and catastrophic forgetting.', // Updated
    elevatorPitch: 'Bio-inspired memory systems enabling lifelong learning without forgetting.',
    connections: 'Stores experiences/knowledge for **Adaptive Learning & Optimization** (RL, FEP); provides context for **Hybrid Neuro-Symbolic Framework** reasoning; enables **Multi-Agent Systems (MAS)** agents to share history/context (potentially via shared knowledge stores); updated via learning processes; relies on **Advanced Hardware & Co-Design** for storage/retrieval.', // Updated
    methods: [ // Updated with analysis details
        'Hierarchical Memory Architectures (mimicking CLS: fast/episodic & slow/semantic streams, HTM concepts).',
        'Neuro-Inspired Modules: LTCNs (multi-timescale modeling), NAMMs (Transformer memory efficiency), DNCs (complex data structures, external read/write memory).',
        'Modeling Multiple Memory Types (Episodic, Semantic, Procedural, Working).',
        'Mitigating Catastrophic Forgetting: Synthetic Traces (Generative Replay), Dynamic Resource Management (pruning, allocation, EWC).',
        'Vector Databases & Knowledge Graphs for efficient retrieval (RAG).',
        'Reflection mechanisms for consolidating experiences into higher-level insights (e.g., Generative Agents).'
    ],
    vitalToAGI: 'Crucial for continuity, cumulative learning, stability-plasticity balance, adaptation, and building intelligence grounded in rich, accessible, and dynamically managed past experiences.', // Updated
    researchHighlights: "CLS theory inspires dual memory systems. Memory-Augmented Networks (DNCs) show potential. Retrieval-Augmented Generation (RAG) is practical now. Generative Agents demo hierarchical memory. Continual Learning algorithms (EWC, Replay) address forgetting.", // Added section
    challenges: [ // Added section based on analysis
        "Efficient organization and retrieval from massive, lifelong memory stores.",
        "Scalability of continual learning and memory mechanisms.",
        "Seamless integration of memory with learning and decision-making (credit assignment).",
        "Mechanisms for knowledge consolidation, correction, and maintaining consistency.",
        "Hardware limitations for large-scale, high-speed memory systems.",
    ],
    subComponents: [
      { id: 'mem-memoripy', title: 'Memoripy Hierarchical Memory', explanation: 'Comprehensive memory framework with tiered storage: Short-Term (LTCNs), Working (NAMMs), and Long-Term (DNCs) memory systems.' },
      { id: 'mem-dynamic', title: 'Dynamic Memory Management', explanation: 'Prioritization algorithms and task-sensitive retrieval (Memory Gating) for efficient information access and vector database integration.' },
      { id: 'mem-stability', title: 'Memory Stability Optimization', explanation: 'Balancing plasticity and stability for reliable long-term storage while enabling new learning.' },
      { id: 'mem-synthetic', title: 'Synthetic Memory Traces', explanation: 'Generated memory patterns that prevent catastrophic forgetting during continual learning processes.' },
      { id: 'mem-shutdown', title: 'Dynamic Memory Bank Shutdowns', explanation: 'Selective deactivation of memory modules to reduce thermal load and power consumption during non-critical operations.' },
      { id: 'mem-retrieval', title: 'Context-Aware Retrieval', explanation: 'Intelligent memory access based on current task demands, semantic relationships, and temporal relevance.' }
    ]
  },
   {
    id: 'learning',
    title: 'Adaptive Learning & Optimization',
    icon: <Recycle className="w-6 h-6" />, // Updated Icon
    color: 'bg-emerald-50', textColor: 'text-emerald-800', borderColor: 'border-emerald-200',
    summary: 'Core engine for AI adaptation driven by data, interaction, feedback, and intrinsic principles like surprise minimization (FEP/Active Inference).', // Updated
    purpose: 'To continually enhance performance, acquire new skills, adapt to changing environments, and discover optimal behaviors and representations autonomously by minimizing prediction errors.', // Updated
    elevatorPitch: 'Self-improving AI that adapts through experience and minimizes prediction errors.',
    connections: 'Updates **Model Architecture Design**; refines **Multi-Agent Systems (MAS)** coordination & strategies; populates/retrieves from **Biologically-Inspired Memory & Knowledge**; guided/constrained by **Embedded Ethics & Verification**; drives **Hybrid Neuro-Symbolic Framework** learning (e.g., learning symbolic rules); executed on **Advanced Hardware & Co-Design**; distributed via **Federated & Decentralized Learning**.', // Updated
    methods: [ // Updated with analysis details
        'Supervised, Unsupervised, Self-Supervised Learning.',
        'Reinforcement Learning (RL) from environment rewards or human feedback (RLHF).',
        'Behavioral Cloning from demonstrations.',
        'Surprise-Minimization Principles: Free Energy Principle (FEP), Active Inference, SDRO, SMiRL for intrinsic motivation, exploration, and stable adaptation.',
        'Predictive Coding and Variational Methods (VAEs) as implementations of FEP.',
        'Gradient-Based Optimization (SGD, Adam) & Meta-Learning.',
        'Evolutionary Algorithms & AutoML.'
    ],
    vitalToAGI: 'Enables the crucial ability to learn, adapt, generalize, and improve autonomously over time by intrinsically seeking stable and predictable interactions with the environment, moving beyond static models.', // Updated
    researchHighlights: "FEP/Active Inference gaining traction in AI/robotics (e.g., NetAIF). Links between FEP and RL/Bayesian methods explored. Intrinsic motivation via surprise (SDRO) or minimization (SMiRL) drives exploration/stability. VAEs/Predictive Coding offer practical FEP implementations.", // Added section
    challenges: [ // Added section based on analysis
        "Computational complexity of full FEP/Active Inference implementation.",
        "Specifying appropriate generative models for agents.",
        "Integrating FEP-based learning with traditional reward/supervised signals.",
        "Avoiding undesirable stable states (e.g., 'dark room problem') in surprise minimization.",
        "Scaling active inference to high-dimensional, complex environments.",
        "Empirical validation of FEP benefits over conventional methods at scale.",
    ],
    subComponents: [
      { id: 'learn-sdro', title: 'SDRO Framework', explanation: 'Surprise-Driven Reflective Optimization with local (agent-level), global (system-wide), and novelty surprise detection for comprehensive adaptation.' },
      { id: 'learn-predictive', title: 'Predictive Coding', explanation: 'Free Energy Minimization implementation that optimizes perception and action by minimizing prediction errors.' },
      { id: 'learn-fep', title: 'Free Energy Principle Applications', explanation: 'Theoretical framework driving adaptive behavior through surprise minimization across perception, learning, and action.' },
      { id: 'learn-rl-ethics', title: 'Ethics-Verified Reinforcement Learning', explanation: 'RL systems with integrated verification to ensure actions comply with ethical constraints before execution.' },
      { id: 'learn-fpga', title: 'FPGA-Based Normative Reasoning', explanation: 'Hardware-accelerated ethical rule processing for real-time verification of AI decisions and actions.' },
      { id: 'learn-lineage', title: 'On-Chain Data Lineage Tracking', explanation: 'Blockchain-based provenance recording for transparent and immutable history of data transformations and model updates.' }
    ]
  },
   {
      id: 'ethics',
      title: 'Embedded Ethics & Verification',
      icon: <ShieldCheck className="w-6 h-6" />, // Updated icon
      color: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-200',
      summary: 'Integrates ethical principles and verification directly into the AI architecture using hardware (FPGAs), blockchain (data lineage), and formal methods for real-time assurance and accountability.', // Updated
      purpose: 'To ensure AI systems operate fairly, transparently, accountably, and align with human values/norms throughout their lifecycle, moving ethics from afterthought to core design.', // Updated
      elevatorPitch: 'Built-in ethical safeguards and verification for trustworthy AI systems.',
      connections: 'Constrains **Multi-Agent Systems (MAS)** agent actions & coordination; guides **Adaptive Learning & Optimization** objectives & reward shaping; relies on **Advanced Hardware & Co-Design** (FPGAs, TEEs) for real-time checks & secure execution; uses **Federated & Decentralized Learning** infrastructure (blockchain) for **Data Lineage** & governance; interacts with **Hybrid Neuro-Symbolic Framework** systems for rule representation & reasoning.', // Updated
      methods: [ // Updated with analysis details
          'Hardware-Software Co-design: FPGA-based normative reasoning, TEEs for secure execution.',
          'Secured On-Chain Data Lineage: Blockchain for transparent, immutable audit trails of data provenance and decisions.',
          'Formal Methods & Logic: Specifying ethical constraints (e.g., temporal logic).',
          'Ethical Governors / Safety Controllers: Real-time monitoring and intervention modules.',
          'Decentralized Governance Protocols: DAO-based mechanisms (e.g., ETHOS framework) for rule updates, oversight, and reputation management.',
          'Integration with Cryptography: ZKPs for proving compliance without revealing sensitive data.'
      ],
      vitalToAGI: 'Essential for building trustworthy, safe, and socially acceptable AGI by making ethics a verifiable, computationally enforced component of the system.', // Updated
      researchHighlights: "ETHOS framework proposes decentralized AI governance. Real-time safety controllers used in robotics. Hardware (FPGAs, TEEs) explored for acceleration/security. Blockchain provides immutable audit trails. Formal methods applied to specify constraints.", // Added section
      challenges: [ // Added section based on analysis
          "Formalizing complex, context-dependent ethical principles into machine-readable rules.",
          "Handling dynamic and culturally varying norms.",
          "Performance overhead of real-time verification (latency issues).",
          "Ensuring ethical outcomes in emergent multi-agent behavior.",
          "Designing trustworthy mechanisms for updating ethical rules.",
          "Lack of mature 'ethics co-processors' or standardized hardware.",
      ],
      subComponents: [
          { id: 'ethics-hw', title: 'Hardware-Accelerated Ethics', explanation: 'FPGA-based normative reasoning providing real-time ethical rule enforcement with minimal latency for critical decisions.' },
          { id: 'ethics-onchain', title: 'On-Chain Data Lineage', explanation: 'Blockchain-based immutable audit trails tracking data provenance, model updates, and decision history for accountability.' },
          { id: 'ethics-formal', title: 'Formal Verification Methods', explanation: 'Mathematical proof techniques ensuring AI systems adhere to specified ethical constraints under all conditions.' },
          { id: 'ethics-governors', title: 'Ethical Governors', explanation: 'Real-time monitoring and intervention modules that prevent potentially harmful actions before execution.' },
          { id: 'ethics-dao', title: 'Decentralized Governance', explanation: 'DAO-based mechanisms (ETHOS framework) enabling transparent, community-driven updates to ethical rule systems.' },
          { id: 'ethics-zkp', title: 'Zero-Knowledge Compliance', explanation: 'Cryptographic proofs demonstrating rule adherence without revealing sensitive operational details or data.' }
      ]
   },
   {
    id: 'hybrid',
    title: 'Hybrid Neuro-Symbolic Framework',
    icon: <Atom className="w-6 h-6" />,
    color: 'bg-fuchsia-50', textColor: 'text-fuchsia-800', borderColor: 'border-fuchsia-200',
    summary: 'Combines neural networks (learning, perception) and symbolic AI (reasoning, structure) using efficient internal languages (SynthLang) for robust, interpretable, and efficient AI.', // Updated
    purpose: 'To create more generalizable AI capable of learning from complex data while performing explicit logical reasoning and communicating efficiently.', // Updated
    elevatorPitch: 'Combines neural networks and symbolic AI for robust reasoning and efficient communication.',
    connections: 'Integrates diverse **Model Architecture Design**; utilizes **Biologically-Inspired Memory & Knowledge** bases (symbolic KGs); provides structure for **Adaptive Learning & Optimization** (rule-guided RL); enables precise **Multi-Agent Systems (MAS)** communication via **SynthLang**; represents **Embedded Ethics & Verification** rules.', // Updated
    methods: [ // Updated with analysis details
        'Neuro-Symbolic Integration Techniques (e.g., neural outputs to symbolic reasoners, logic tensor networks).',
        'Symbolic Knowledge Representation (Logic programming, Ontologies, Knowledge Graphs).',
        '**SynthLang:** Hyper-efficient, polysynthetic language for internal reasoning & agent communication (reduces token usage, ambiguity).',
        'Emergent Communication Protocols learned by agents.',
        'Differentiable Programming & Learning Logical Rules from data.',
        'Modular architectures separating perception, reasoning, action.',
        'Using symbolic representations as an interlingua or shared knowledge base.'
    ],
    vitalToAGI: 'Bridges pattern recognition and abstract thought, enabling deeper understanding, explainability, compositional reasoning, and efficient inter-agent communication.', // Updated
    researchHighlights: "Emergent communication studied in MARL. SynthLang demonstrates token efficiency gains. Neuro-symbolic AI combines deep learning with logic (e.g., IBM, OpenCog). Use of knowledge graphs as shared symbolic memory.", // Added section
    challenges: [ // Added section based on analysis
        "Interpretability of emergent communication protocols.",
        "Standardization vs. flexibility of agent languages.",
        "Bandwidth constraints and noise robustness in communication.",
        "Accuracy and reliability of neuro-symbolic translation.",
        "Designing languages expressive enough yet efficient.",
        "Integrating symbolic reasoning seamlessly with neural learning.",
    ],
    subComponents: [
      { id: 'hybrid-synthlang', title: 'Polysynthetic Language (SynthLang)', explanation: 'Hyper-efficient AI communication protocol with 93% token reduction through glyph compression for optimal inter-agent exchanges.' },
      { id: 'hybrid-ast', title: 'AST Knowledge Encoding', explanation: 'Abstract Syntax Tree representation of knowledge for structured, efficient, and computationally manipulable information storage.' },
      { id: 'hybrid-foundations', title: 'Mathematical Foundations', explanation: 'Set theory, category theory, and topology providing formal basis for representing complex relationships and spatial concepts.' },
      { id: 'hybrid-integration', title: 'Neural-Symbolic Bridge', explanation: 'TPTrans transformer-based architecture connecting neural pattern recognition with symbolic reasoning systems.' },
      { id: 'hybrid-optimization', title: 'Neurosymbolic Optimization', explanation: 'Specialized techniques including tensorized logic gates, layer-freezing for stability, and alternating constraint learning.' },
      { id: 'hybrid-reasoning', title: 'Associative Logic Engine', explanation: 'Hybrid reasoning system combining machine learning with rule-based inference for robust problem-solving capabilities.' }
    ]
  },
   {
    id: 'federated',
    title: 'Federated & Decentralized Learning',
    icon: <Cloud className="w-6 h-6" />,
    color: 'bg-rose-50', textColor: 'text-rose-800', borderColor: 'border-rose-200',
    summary: 'Enables collaborative AI model training on distributed datasets without centralizing raw data, using cryptographic methods (ZKML, HE) and incentives for privacy and security.', // Updated
    purpose: 'To facilitate privacy-preserving learning from real-world, siloed data sources, enhancing data access while maintaining confidentiality and robustness against attacks.', // Updated
    elevatorPitch: 'Privacy-preserving AI training across distributed data sources.',
    connections: 'A distributed method for **Adaptive Learning & Optimization**; enables private knowledge sharing in **Multi-Agent Systems (MAS)** (PoGI); relies on **Advanced Hardware & Co-Design** for local compute; requires **Embedded Ethics & Verification** for data governance & privacy compliance; uses cryptographic techniques (**ZKPs**) from **Byzantine-Resilient Trust & Verification** component; involves **Economic Incentives**.', // Updated
    methods: [ // Updated with analysis details
        'Federated Learning (FL) variants (FedAvg, FedProx).',
        'Fully Decentralized (Peer-to-Peer) Learning protocols.',
        'Privacy-Preserving Cryptographic Methods: ZKPs/ZKML (e.g., zkFL), Homomorphic Encryption (HE), Secure Multi-Party Computation (SMPC), Differential Privacy.', // Updated
        'Robust Aggregation Rules against Byzantine clients (e.g., filtering, consistency scoring, LASA).',
        'Blockchain for coordination, incentive distribution, and verifiable aggregation.',
        'Economic Incentives for Participation (e.g., token rewards, reputation systems).'
    ],
    vitalToAGI: 'Essential for training powerful AI models on diverse real-world data while respecting privacy, security, ownership, and enabling collaborative intelligence.', // Updated
    researchHighlights: "ZKPs applied to FL for verifiable aggregation (zkFL). Robust aggregation rules (LASA) developed against Byzantine attacks. Integration with blockchain for incentives and coordination explored.", // Added section
    challenges: [ // Added section based on analysis
        "Handling data heterogeneity across clients (non-IID data).",
        "Communication efficiency between numerous clients.",
        "Robustness against sophisticated Byzantine attacks.",
        "Computational overhead of advanced cryptographic methods (ZKPs, HE).",
        "Ensuring fairness in incentive distribution and model updates.",
    ],
    subComponents: [
      { id: 'fed-bounties', title: 'Crypto Bounties', explanation: 'Blockchain-based reward system for AI skill acquisition and incentivizing high-quality contributions to federated models.' },
      { id: 'fed-zkml', title: 'zk-SNARKs Privacy', explanation: 'Zero-knowledge proofs enabling privacy-preserving AI training while verifying computation correctness without revealing sensitive data.' },
      { id: 'fed-neuroplasticity', title: 'Federated Neuroplasticity', explanation: 'Cross-agent adaptation mechanisms allowing distributed models to share learning while maintaining specialization.' },
      { id: 'fed-encryption', title: 'Hierarchical Homomorphic Encryption', explanation: 'Multi-level encrypted computation enabling secure operations on sensitive data without decryption.' },
      { id: 'fed-credits', title: 'Compute Credit Markets', explanation: 'Decentralized marketplace for equitable AI access, allowing resource trading and democratic participation.' },
      { id: 'fed-hardware', title: 'Regional AI Manufacturing', explanation: 'RISC-V open-source hardware initiatives promoting localized AI infrastructure development and sovereignty.' }
    ]
  },
  {
    id: 'hardware',
    title: 'Advanced Hardware & Co-Design',
    icon: <Cpu className="w-6 h-6" />,
    color: 'bg-cyan-50', textColor: 'text-cyan-800', borderColor: 'border-cyan-200',
    summary: 'Leverages specialized AI accelerators, high-bandwidth memory/interconnects (HBM3, CXL), and software co-optimization for efficient, scalable AI computation.', // Updated
    purpose: 'To provide the necessary performance, bandwidth, and power efficiency for complex AI models, large-scale simulations, real-time interaction, and hardware-accelerated ethics.', // Updated
    elevatorPitch: 'Specialized hardware enabling efficient, high-performance AI computation.',
    connections: 'The physical foundation for all components; enables intensive **Adaptive Learning & Optimization**, large **Biologically-Inspired Memory & Knowledge** systems, real-time **Multi-Agent Systems (MAS)** interaction, accelerated **Embedded Ethics & Verification** checks (FPGAs, TEEs), and efficient **Federated & Decentralized Learning** on edge devices.', // Updated
    methods: [ // Updated with analysis details
        'AI Accelerators (GPUs, TPUs, NPUs, FPGAs).',
        'High-Bandwidth Memory (HBM3) & Interconnects (CXL) for data throughput.',
        'Sophisticated Cooling Solutions for thermal management.',
        'Hardware-Software Co-design & Optimizations (Quantization, Sparsity, Compilers like TVM, XLA).',
        'Neuromorphic Computing and other emerging paradigms.',
        'Specialized hardware for ethics/security (FPGAs for normative reasoning, TEEs).'
    ],
    vitalToAGI: 'Makes computationally intensive AGI architectures feasible, enabling training, deployment, and real-time operation at scale across cloud, edge, and embedded platforms.', // Updated
    researchHighlights: "Focus on specialized accelerators (GPUs, TPUs). Importance of memory bandwidth (HBM3) and interconnects (CXL). Growing interest in FPGAs for edge AI and potentially ethics. Neuromorphic computing explores brain-like efficiency.", // Added section
    challenges: [ // Added section based on analysis
        "Power consumption and heat dissipation at scale.",
        "Memory wall bottleneck (data movement limitations).",
        "Cost of specialized hardware.",
        "Software complexity for optimizing across diverse hardware.",
        "Maturity and accessibility of emerging paradigms (neuromorphic).",
    ],
    subComponents: [
      { id: 'hw-cxl', title: 'Neural Connectivity (CXL)', explanation: 'Compute Express Link technology providing high-speed CPU-to-device and CPU-to-memory interconnects for efficient neural processing.' },
      { id: 'hw-hbm3', title: 'Synaptic Memory (HBM3)', explanation: 'High-Bandwidth Memory providing massive parallel data access for AI model weights and activations.' },
      { id: 'hw-namms', title: 'Adaptive Working Memory', explanation: 'NAMMs hardware implementation for efficient context management and attention mechanisms in transformer architectures.' },
      { id: 'hw-parallel', title: 'Real-Time Parallel Processing', explanation: 'LTCNs combined with GPU acceleration for handling time-variable data streams with dynamic time constants.' },
      { id: 'hw-cooling', title: 'Liquid Cooling & Water Recovery', explanation: 'Advanced thermal management with atmospheric water recovery systems for sustainable AI infrastructure.' },
      { id: 'hw-thermal', title: 'AI-Driven Thermal Redistribution', explanation: 'Intelligent heat management systems that dynamically optimize thermal distribution across computing clusters.' },
      { id: 'hw-water', title: 'Water-Efficient Closed-Loop Systems', explanation: 'Sustainable cooling infrastructure minimizing water consumption through advanced recycling techniques.' }
    ]
  }
];

export const crossCuttingComponentsData: CrossCuttingComponent[] = [
  {
    id: 'cc-adapt',
    title: 'AI Performance & Adaptability',
    icon: <Recycle className="w-5 h-5" />,
    explanation: 'Self-optimizing AI system with MultiAgent coordination, MetaLearning capabilities, and Hierarchical Task Learning for contextual skill acquisition and continuous performance improvement.'
  },
  {
    id: 'cc-human',
    title: 'Human Task Data Collection',
    icon: <UsersRound className="w-5 h-5" />,
    explanation: 'Comprehensive human activity recording including SpreadsheetManipulation, PowerPointCreation, CanvaDesign, VideoEditing, and EEG brain activity mapping during tasks for high-fidelity AI training.'
  },
  {
    id: 'cc-dataassoc',
    title: 'Multimodal Data Association',
    icon: <GitMerge className="w-5 h-5" />,
    explanation: 'Advanced perception system integrating diverse sensory inputs (vision, audio, haptics), textual data, and cross-domain association learning to link concepts across different modalities.'
  },
  {
    id: 'cc-gui',
    title: 'GUI-Byte Dance TARS Integration',
    icon: <Eye className="w-5 h-5" />,
    explanation: 'Sophisticated interface automation with reinforcement learning modules for self-improving UI agents and real-time adaptation to changing interface elements.'
  },
  {
    id: 'cc-framework',
    title: 'Learning Framework & Orchestration',
    icon: <Workflow className="w-5 h-5" />,
    explanation: 'Comprehensive system orchestrating Cross-Domain Association Learning, Surprise-Driven Reflective Optimization with meta-cognitive feedback loops, and Federated Neuroplasticity for distributed generalization.'
  },
  {
    id: 'cc-arch',
    title: 'Unified Model Architecture',
    icon: <BrainCircuit className="w-5 h-5" />,
    explanation: 'All-in-one Encoder-Decoder architecture handling multi-modal inputs (text, image, video, EEG, GUI data) with specialized task-specific generative capabilities for diverse AI applications.'
  },
  {
    id: 'cc-reinforce',
    title: 'Reinforcement Learning Systems',
    icon: <Bot className="w-5 h-5" />,
    explanation: 'Advanced RL frameworks including SMiRL (Surprise-Minimizing RL), Epistemic/Aleatoric/Novelty Surprise detection, ethics compliance verification, and just-in-time compilation for adaptive loss functions.'
  }
];


export const agentExamplesData: AgentExample[] = [
    // Updated Ace Agent
    {
        id: 'agent-ace',
        name: 'Ace (Behavioral Cloning Agent)',
        icon: <Bot className="w-5 h-5"/>,
        role: 'High-performance AI computer control agent ("autopilot").',
        useCase: 'Automating complex GUI tasks across applications by mimicking human demonstrations recorded via screen/input logs.', // Refined use case
        keyComponentsUsed: ['learning (Behavioral Cloning)', 'cc-gui', 'cc-dataassoc (GUI/Input)', 'memory (Task Sequences)', 'hardware (Execution)'], // Added memory link
        capabilities: 'Learns intricate GUI manipulations directly from demonstrations via behavioral training. Executes learned desktop workflows with speed and accuracy.', // Slightly refined
        futureEvolution: 'Improve generalization beyond demonstrations, integrate **RL** for refinement/error recovery, enhance robustness to UI changes, scale data collection, potentially integrate into **MAS** for complex workflows coordinated by an orchestrator.', // Added MAS link
        color: 'bg-teal-50', textColor: 'text-teal-800', borderColor: 'border-teal-300',
        scenario: `**Real-world Example:** Ace can be trained to automate a complex data entry workflow across multiple applications:
1. Watches a human demonstrate:
   - Opening CRM software
   - Extracting customer details
   - Switching to accounting system
   - Entering invoice data
   - Generating reports in spreadsheet
2. Learns the exact sequence of clicks, keystrokes and navigation
3. Repeats the workflow autonomously with perfect accuracy
4. Can handle variations like different customer record formats
5. Logs completion status to memory for auditing`
    },
    {
        id: 'agent-roocode',
        name: 'RooCode (Coding Assistant)',
        icon: <FileCode className="w-5 h-5"/>,
        role: 'Specialized AI coding assistant.',
        useCase: 'Code generation, debugging, explanation, refactoring within IDEs, leveraging context and potentially external tools/knowledge bases.', // Slightly refined
        keyComponentsUsed: ['hybrid (LLM+Symbolic Rules)', 'memory (Code Context, Past Solutions)', 'learning (Feedback, RLHF)', 'cc-gui (IDE Interaction)', 'mas (Potential Team Member)'], // Updated hybrid, memory
        capabilities: 'Understands code context, generates relevant code, uses tools (linters, debuggers), interacts with IDE GUI. Learns from user interactions and feedback. Potentially uses symbolic reasoning for algorithms.', // Added symbolic reasoning
        futureEvolution: 'More autonomous problem-solving; deeper **Hybrid** integration (neuro-symbolic reasoning); active participation in **MAS** coding teams; enhanced long-term project **Memory** and adaptation via **Learning**.', // Refined
        color: 'bg-green-50', textColor: 'text-green-800', borderColor: 'border-green-300',
        scenario: `**Real-world Example:** RooCode analyzes messy legacy code, suggests context-aware refactoring, debugs issues in real time, and adapts its recommendations as the project evolves.`
    },
    {
        id: 'agent-manus',
        name: 'Manus (Orchestrator Agent)',
        icon: <Hand className="w-5 h-5"/>,
        role: 'Cognitive executive agent translating requests into multi-step actions and coordinating specialized agents.', // Updated role based on analysis
        useCase: 'Manages complex workflows (research, scheduling) by planning, decomposing tasks, and dynamically allocating sub-tasks to specialized agents (e.g., **Ace** for GUI, **RooCode** for code) via mechanisms like auctions within the **MAS** framework.', // Updated use case based on analysis
        keyComponentsUsed: ['mas (Orchestrator, Auctions)', 'hybrid (LLM Planner + SynthLang?)', 'memory (Task State, Agent Capabilities)', 'cc-gui (Interface Control)', 'learning (Planning Refinement)'], // Updated MAS, Hybrid, Memory
        capabilities: 'Parses requests, creates plans, selects and calls appropriate sub-agents/tools/APIs, manages execution flow, potentially using cognitive executive functions for reasoning and adaptation.', // Added cognitive functions
        futureEvolution: 'Develop robust long-term **Memory** for personalization/context; improve planning and error handling via **Adaptive Learning** (potentially FEP-driven); enhance reliability and efficiency in coordinating diverse agents within the **MAS** using verifiable trust (**ZKPs**).', // Added FEP, ZKPs
        color: 'bg-blue-50', textColor: 'text-blue-800', borderColor: 'border-blue-300',
        scenario: `**Real-world Example:** Manus receives a complex project request, decomposes it into specialized tasks, assigns each to experts like Ace and RooCode, and aggregates the outcomes into a cohesive project plan.`
    },
    {
        id: 'agent-genspark',
        name: 'GenSpark (Research Agent)',
        icon: <Microscope className="w-5 h-5"/>, // Changed icon
        role: 'Agent specializing in knowledge discovery, research synthesis, and complex reasoning.', // Slightly refined role
        useCase: 'Conducting literature reviews, hypothesis generation, experimental design (simulated), verifying information across sources (RAG), generating structured reports, utilizing **MAS** for distributed data analysis or simulation.', // Expanded use case
        keyComponentsUsed: ['mas (Sub-Agents, Data Sharing)', 'memory (Knowledge Base, RAG, CLS)', 'hybrid (Fact-Checking, Symbolic Reasoning)', 'cc-dataassoc (Multimodal Sources)', 'learning (Query Understanding, FEP for model refinement)', 'federated (Accessing distributed datasets securely)'], // Added CLS, FEP, Federated
        capabilities: 'Aggregates/synthesizes info, performs fact verification, executes multi-hop reasoning, potentially learns causal models, coordinates sub-agents for specific research tasks (search, verify, simulate).', // Added coordination
        futureEvolution: 'Enhance complex causal/symbolic reasoning (**Hybrid**); adapt research strategies via **Adaptive Learning** (RLHF, FEP); integrate deeper multimodal analysis (**cc-dataassoc**); improve collaboration protocols & trust within **MAS** research teams (**ZKPs**); leverage **Federated Learning** for large-scale collaborative discovery.', // Refined future
        color: 'bg-yellow-50', textColor: 'text-yellow-800', borderColor: 'border-yellow-300',
        scenario: `**Real-world Example:** GenSpark processes vast research data and publications, synthesizes emerging trends, and delivers an insightful report that informs strategic research directions.`
    },
     // --- New Agent Example based on Use Cases ---
    {
        id: 'agent-guardian',
        name: 'Guardian (Ethical Compliance Agent)',
        icon: <ShieldCheck className="w-5 h-5"/>, // Changed icon
        role: 'Dedicated agent ensuring ethical compliance and monitoring within the MAS.',
        useCase: 'Monitors interactions between agents, verifies adherence to predefined ethical rules (potentially via FPGA checks), flags violations, and logs compliance data securely on-chain for auditing (Data Lineage).', // Derived from Ethics pillar description
        keyComponentsUsed: ['ethics (Verification, On-Chain Lineage, Governance)', 'mas (Monitoring Node)', 'hybrid (Rule Representation)', 'hardware (FPGA/TEE Acceleration)'], // Linking relevant components
        capabilities: 'Performs real-time checks against ethical constraints, generates compliance reports, securely logs events on blockchain, potentially participates in decentralized governance votes on ethical rule updates.',
        futureEvolution: 'Develop more sophisticated normative reasoning capabilities (**Hybrid**); integrate with **Adaptive Learning** to learn patterns of potentially unethical behavior proactively; improve efficiency of hardware checks (**Hardware**); enhance robustness against adversarial manipulation.',
        color: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-300',
        scenario: `**Real-world Example:** Guardian monitors inter-agent communications in real time, flags ethical breaches, and alerts overseers to safeguard system integrity.`
    }
];