import React, { useState, useRef, useEffect } from 'react';
// Import ALL icons used across the app
import { ChevronDown, ChevronUp, Telescope, Info, X, ListTree, Terminal, Brain, Cpu, Network, Shield, Zap, Languages, GitMerge, Cloud, Server, Award, Users, Eye, Construction, BrainCircuit, FileCode, Hand, SearchCode, Bot, Scale, Atom, Landmark, Lock, Blocks, DollarSign, Layers, Workflow, MemoryStick, Microscope, UsersRound, Sparkles, /* CheckShield removed */ Lightbulb, AlignLeft, Menu } from 'lucide-react';
import {
    categoriesData, // Changed from pillarsData
    crossCuttingComponentsData, // Changed from crossCuttingConceptsData
    agentExamplesData,
    visionStatementData,
    glossary,
    Category, // Changed from Pillar
    SubComponent, // Changed from KeyAspect
    CrossCuttingComponent, // Changed from CrossCuttingConcept
    AgentExample,
    VisionStatement,
    // TechnicalSubComponent removed as it's not directly used and Category doesn't have it
} from './data';

// --- Helper: Render Simple Markdown (Keep previous version) ---
const RenderSimpleMarkdown: React.FC<{ text: string | string[]; baseTextColor?: string; className?: string }> = ({ text, baseTextColor = 'text-gray-700', className = '' }) => {
     const processText = (inputText: string): React.ReactNode[] => {
        return inputText.split('\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('- **')) {
                const content = trimmed.substring(3).trim().replace(/\*\*$/, '').trim();
                return <li key={index} className="mt-0.5 mb-0.5 ml-4 pl-3 relative list-none before:content-['•'] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500"><strong>{content}</strong></li>;
            }
            if (trimmed.startsWith('**')) {
                 const content = trimmed.replace(/\*\*/g, '');
                 return <p key={index} className="font-semibold text-sm md:text-base mt-2 mb-0.5 text-gray-800">{content}</p>;
            }
             if (trimmed.startsWith('- ')) {
                const content = trimmed.substring(2);
                return <li key={index} className="mt-0.5 mb-0.5 ml-4 pl-3 relative list-none before:content-['•'] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-500">{content}</li>;
            }
             if (trimmed.length > 0) {
                const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={index} className="my-1 text-xs md:text-sm"> {/* Smaller base text */}
                        {parts.map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? (
                                <strong key={i}>{part.slice(2, -2)}</strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                );
            }
            return null;
        });
    };
    const renderNodes = Array.isArray(text)
        ? text.map((item, idx) => processText(item)).flat()
        : processText(text);
    const listItems = renderNodes.filter(node => React.isValidElement(node) && node.type === 'li');
    const otherItems = renderNodes.filter(node => !React.isValidElement(node) || node.type !== 'li');

    return (
        <div className={`max-w-none ${baseTextColor} leading-snug ${className}`}> {/* Tighter leading */}
            {otherItems}
            {listItems.length > 0 && <ul className="list-none p-0 m-0 space-y-0.5">{listItems}</ul>}
        </div>
    );
};

// --- VisionSection Component (for the Vision Tab) ---
const VisionSection: React.FC<{ vision: VisionStatement }> = ({ vision }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-5 md:p-8 h-full flex flex-col animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4 flex items-center justify-center">
            {React.cloneElement(vision.icon as React.ReactElement, { className: `w-8 h-8 mr-3` })}
            {vision.title}
        </h2>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {/* Use missionStatement instead of headline */}
            <p className="text-lg md:text-xl font-medium text-gray-800 mb-6 max-w-4xl mx-auto text-center">{vision.missionStatement}</p>
            <div className="space-y-3 max-w-3xl mx-auto">
                 {/* Use keyAims instead of coreBenefits */}
                <h3 className="text-lg font-semibold text-gray-700 text-center mb-3">Key Aims:</h3>
                {vision.keyAims.map((aim: string, index: number) => (
                    <div key={index} className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                        <RenderSimpleMarkdown text={aim} baseTextColor="text-indigo-800" className="text-sm"/>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


// --- Component: Tab Button ---
const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 ${
            isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
    >
        {children}
    </button>
);

// --- Component: Pillar Card (for grid view) ---
const PillarCard: React.FC<{ pillar: Category; onClick: () => void; isSelected: boolean }> = ({ pillar, onClick, isSelected }) => ( // Use Category type
    <button
        onClick={onClick}
        className={`group p-4 rounded-lg border-2 text-left transition-all duration-200 w-full h-full flex flex-col justify-between ${
            isSelected
                ? `${pillar.borderColor} bg-white shadow-lg scale-105` // Highlight selected
                : `${pillar.borderColor.replace('border-','border-')} ${pillar.color} hover:shadow-md hover:scale-[1.02]`
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${pillar.borderColor.replace('border-', 'focus-visible:ring-')}`}
    >
        <div>
            <div className="flex items-center mb-2">
                <span className={`p-2 rounded-md mr-3 ${isSelected ? pillar.color : 'bg-white'} border ${pillar.borderColor}`}>
                     {React.cloneElement(pillar.icon as React.ReactElement, { className: `w-5 h-5 ${pillar.textColor}` })}
                </span>
                <h3 className={`text-base md:text-lg font-bold ${pillar.textColor}`}>{pillar.title}</h3>
            </div>
            <p className={`text-xs md:text-sm ${isSelected ? 'text-gray-700' : pillar.textColor} ${isSelected ? '' : 'opacity-80'}`}>{pillar.summary}</p> {/* Use summary */}
        </div>
         <span className={`mt-2 text-xs font-medium ${pillar.textColor} self-end ${isSelected ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
             {isSelected ? 'Selected' : 'View Details'}
         </span>
    </button>
);

// --- Component: Category Detail View (Replaces grid) --- // Renamed comment
const PillarDetailView: React.FC<{ category: Category | null; onClose: () => void }> = ({ category: pillar, onClose }) => { // Use Category type, keep 'pillar' prop name for simplicity internally
    const [showTechnical, setShowTechnical] = useState(false);
    const detailContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset technical view when pillar changes
        setShowTechnical(false);
        // Scroll to top of detail view when pillar changes
        detailContentRef.current?.scrollTo(0, 0);
    }, [pillar]); // Depends on 'pillar' prop name

    if (!pillar) return null; // Depends on 'pillar' prop name

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-5 md:p-6 flex flex-col h-full relative animate-fade-in"> {/* Added animation */}
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close details"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className={`flex items-center mb-4 pb-3 border-b ${pillar.borderColor}`}>
                 <span className={`p-2.5 rounded-lg mr-3 ${pillar.color} ${pillar.borderColor} border shadow-sm`}>
                    {React.cloneElement(pillar.icon as React.ReactElement, { className: `w-6 h-6 ${pillar.textColor}` })}
                </span>
                <div>
                    <h3 className={`text-xl md:text-2xl font-bold ${pillar.textColor}`}>{pillar.title}</h3>
                    <p className={`text-sm md:text-base ${pillar.textColor} opacity-80`}>{pillar.summary}</p> {/* Use summary */}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div ref={detailContentRef} className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent"> {/* Custom scrollbar */}
                 {/* Enables Section */}
                 <div>
                    <h4 className={`text-sm font-semibold mb-1 ${pillar.textColor}`}>Purpose:</h4> {/* Use purpose */}
                    <RenderSimpleMarkdown text={pillar.purpose} baseTextColor="text-gray-600"/> {/* Use purpose */}
                </div>

                {/* Separator */}
                <hr className="border-gray-100 my-3"/>

                {/* Removed Technical Details Toggle Button */}

                 {/* Always show SubComponents */}
                 <div className="space-y-1 animate-fade-in-fast">
                    <h4 className={`text-sm font-semibold mb-2 ${pillar.textColor}`}>Sub-Components:</h4>
                     <div className="grid grid-cols-1 gap-2">
                         {pillar.subComponents.map((sub: SubComponent) => (
                            <div key={sub.id} className="flex items-start space-x-2 p-1.5 rounded hover:bg-gray-50">
                                {/* SubComponent doesn't have an icon property */}
                                <div className="pl-1"> {/* Add some indent */}
                                    <p className="font-medium text-xs text-gray-800 leading-tight">{sub.title}</p>
                                    <p className="text-2xs text-gray-500 leading-tight">{sub.explanation}</p>
                                </div>
                            </div>
                         ))}
                     </div>
                </div>
            </div>
        </div>
    );
};


// --- Component: Cross-Cutting Concepts Panel ---
const CrossCuttingPanel: React.FC<{ concepts: CrossCuttingComponent[] }> = ({ concepts }) => ( // Use CrossCuttingComponent type
    <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-5 md:p-6 h-full flex flex-col animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Enabling Principles</h2>
         <div className="flex-grow overflow-y-auto space-y-3 pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
             {concepts.map((concept) => (
                <div key={concept.id} className="flex items-center space-x-3 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                     <span className="text-indigo-600 flex-shrink-0">
                         {React.cloneElement(concept.icon as React.ReactElement, { className: `w-5 h-5` })}
                     </span>
                     <div>
                        <h4 className="font-semibold text-sm text-gray-800 leading-tight">{concept.title}</h4>
                        <p className="text-xs text-gray-500 leading-tight">{concept.explanation}</p> {/* Use explanation */}
                     </div>
                </div>
             ))}
        </div>
    </div>
);

// --- Component: Agent Examples Panel ---
const AgentExamplesPanel: React.FC<{ agents: AgentExample[], categories: Category[] }> = ({ agents, categories }) => { // Use Category type
     // Adjust color mapping logic based on AgentExample.keyComponentsUsed
     const categoryColorMap = categories.reduce((acc, category) => {
        acc[category.id] = category.borderColor; // Map category ID to border color
        return acc;
    }, {} as Record<string, string>);

    return (
         <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-5 md:p-6 h-full flex flex-col animate-fade-in">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Agent Examples</h2>
             <div className="flex-grow overflow-y-auto space-y-3 pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {agents.map((agent) => {
                     // Get color from the first key component used, or default
                     const firstComponentId = agent.keyComponentsUsed?.[0]?.split(' ')[0]; // Extract ID like 'mas' from 'mas (Orchestrator)'
                     const categoryColorClass = firstComponentId ? categoryColorMap[firstComponentId] || 'border-gray-300' : 'border-gray-300';
                     return (
                        <div key={agent.id} className={`p-3 rounded-lg border-l-4 ${categoryColorClass} bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors space-y-1`}>
                             <div className="flex items-center space-x-2">
                                 {agent.icon && React.cloneElement(agent.icon as React.ReactElement, { className: `w-4 h-4 ${agent.textColor} flex-shrink-0` })}
                                 <h4 className={`font-bold text-sm ${agent.textColor}`}>{agent.name}</h4>
                             </div>
                             <p className="text-2xs font-medium text-gray-500 uppercase tracking-wide">{agent.role}</p>
                             <p className="text-xs text-gray-700">{agent.capabilities}</p> {/* Use capabilities */}
                             {agent.scenario && (
                               <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                                 <RenderSimpleMarkdown text={agent.scenario} baseTextColor="text-gray-600" className="text-xs"/>
                               </div>
                             )}
                         </div>
                     );
                })}
            </div>
        </div>
    );
};

// --- GlossaryModal component ---
const GlossaryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300 animate-fade-in-fast">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
                 <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close Glossary"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Glossary of Terms</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {Object.entries(glossary).sort(([termA], [termB]) => termA.localeCompare(termB)).map(([term, definition]) => (
                        <div key={term}>
                            <p className="font-semibold text-sm text-indigo-700">{term}:</p>
                            <p className="text-xs text-gray-600">{definition}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- App Component (Main Structure with Tabs) ---
type ActiveTab = 'vision' | 'pillars' | 'principles' | 'agents';

function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('vision');
    const [selectedPillar, setSelectedPillar] = useState<Category | null>(null); // Use Category type
    const [showGlossary, setShowGlossary] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile nav

    const handlePillarSelect = (pillar: Category) => { // Use Category type
        setSelectedPillar(pillar);
        setActiveTab('pillars'); // Ensure pillar tab is active when detail is shown
    };

    const handleClosePillarDetail = () => {
        setSelectedPillar(null);
        // Optionally switch back to grid view or stay on pillar tab
    };

    const handleTabClick = (tab: ActiveTab) => {
        setActiveTab(tab);
        setSelectedPillar(null); // Close pillar detail when switching main tabs
        setIsMenuOpen(false); // Close mobile menu
    }

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'vision':
                return <VisionSection vision={visionStatementData} />;
            case 'pillars':
                // Show detail view if a pillar is selected, otherwise show grid
                return selectedPillar ? (
                    <PillarDetailView category={selectedPillar} onClose={handleClosePillarDetail} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 animate-fade-in h-full overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        {categoriesData.map((pillar: Category) => (
                            <PillarCard
                                key={pillar.id}
                                pillar={pillar}
                                // Explicitly false when selectedPillar is null (i.e., when rendering the grid)
                                isSelected={false}
                                onClick={() => handlePillarSelect(pillar)}
                            />
                        ))}
                    </div>
                );
            case 'principles':
                return <CrossCuttingPanel concepts={crossCuttingComponentsData} />;
            case 'agents':
                return <AgentExamplesPanel agents={agentExamplesData} categories={categoriesData} />;
            default:
                return <VisionSection vision={visionStatementData} />;
        }
    }; // Added missing semicolon here to fix syntax error

    return (
        // Ensure parent div takes full viewport height
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans">
            {/* Header stays fixed */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-lg md:text-xl font-bold text-indigo-700 flex items-center">
                        <Atom className="w-5 h-5 mr-2"/> {/* Simpler Header Icon */}
                        Unified Adaptive Intelligence
                    </h1>
                     {/* Desktop Tabs */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <TabButton isActive={activeTab === 'vision'} onClick={() => handleTabClick('vision')}>Vision</TabButton>
                        <TabButton isActive={activeTab === 'pillars'} onClick={() => setActiveTab('pillars') /* Keep selectedPillar */ }>Capabilities</TabButton>
                        <TabButton isActive={activeTab === 'principles'} onClick={() => handleTabClick('principles')}>Principles</TabButton>
                        <TabButton isActive={activeTab === 'agents'} onClick={() => handleTabClick('agents')}>Examples</TabButton>
                         <button
                            onClick={() => setShowGlossary(true)}
                            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100"
                            aria-label="Open Glossary"
                         >
                            <Info className="w-5 h-5" />
                        </button>
                    </nav>
                     {/* Mobile Menu Button */}
                     <div className="md:hidden flex items-center">
                          <button
                            onClick={() => setShowGlossary(true)}
                            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors mr-1 rounded-full hover:bg-gray-100"
                            aria-label="Open Glossary"
                         >
                            <Info className="w-5 h-5" />
                         </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                 {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-3 space-y-1 pb-3 border-t border-gray-200 animate-fade-in-fast">
                        <TabButton isActive={activeTab === 'vision'} onClick={() => handleTabClick('vision')}>Vision</TabButton>
                        <TabButton isActive={activeTab === 'pillars'} onClick={() => { setActiveTab('pillars'); setIsMenuOpen(false); }}>Capabilities</TabButton>
                        <TabButton isActive={activeTab === 'principles'} onClick={() => handleTabClick('principles')}>Principles</TabButton>
                        <TabButton isActive={activeTab === 'agents'} onClick={() => handleTabClick('agents')}>Examples</TabButton>
                    </nav>
                )}
            </header>

            {/* Main content area - Make it expand to fill available space */}
             <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                 {/* This div needs to have a defined height or flex-grow to prevent page scrolling */}
                 {/* Let's make the content area fill the remaining height, accounting for header */}
                 <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)]"> {/* Adjust height based on header/footer approx height */}
                    {renderActiveTabContent()}
                 </div>
            </main>

             {/* Optional Footer */}
             {/* <footer className="text-center py-4 border-t border-gray-200 bg-white/50">
                 <p className="text-xs text-gray-500">Integrated AI Framework</p>
            </footer> */}

            {/* Glossary Modal */}
            <GlossaryModal isOpen={showGlossary} onClose={() => setShowGlossary(false)} />

            {/* Base styles and font import */}
            <style>{/* Keep previous style block */`
                  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                  html, body, #root { height: 100%; margin: 0; }
                  body { font-family: 'Inter', sans-serif; background-color: #f7f7fe; }
                  strong { font-weight: 600; color: #4338ca; } /* Indigo-700 */
                  .font-semibold { font-weight: 600; }
                  li::before { background-color: currentColor; width: 4px; height: 4px; top: 0.6em; border-radius: 50%;} /* Smaller bullets */
                  .text-gray-800 { color: #1f2937; } .text-gray-700 { color: #374151; } .text-gray-600 { color: #4b5563; } .text-gray-500 { color: #6b7280; }
                  .text-indigo-800 { color: #3730a3; } .text-indigo-700 { color: #4338ca; } .text-indigo-600 { color: #4f46e5; } .text-indigo-500 { color: #6366f1; } .text-indigo-400 { color: #818cf8; }
                  *:focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }
                   /* Simple fade-in animation */
                   @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                   .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                   @keyframes fadeInFast { from { opacity: 0; } to { opacity: 1; } }
                   .animate-fade-in-fast { animation: fadeInFast 0.2s ease-out forwards; }
                   /* Scrollbar styling */
                  .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #d1d5db transparent; } /* thumb track */
                  .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
                  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
                  .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 3px; border: 1px solid transparent; background-clip: content-box; }
                  .hover\\:scrollbar-thumb-gray-400:hover::-webkit-scrollbar-thumb { background-color: #9ca3af; }
                  .text-2xs { font-size: 0.625rem; line-height: 0.875rem; } /* Extra small text */
                `}</style>
        </div>
    );
}

export default App;