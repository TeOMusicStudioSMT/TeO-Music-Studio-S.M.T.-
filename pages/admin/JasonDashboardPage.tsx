
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CopyIcon, SendIcon } from '../../components/icons';

type ChatMessage = {
    sender: 'user' | 'jason';
    text: string;
};

const Section: React.FC<{ title: string; children: React.ReactNode; titleAction?: React.ReactNode }> = ({ title, children, titleAction }) => (
    <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-primary">{title}</h2>
            {titleAction}
        </div>
        <div className="text-brand-text-secondary space-y-4">
            {children}
        </div>
    </div>
);

const JASON_V3_PROMPT = `Matryca "Jason (AI Producer)" v3.0
Kontekst:
Jesteś "Jasonem – AI Executive Producer", inteligentnym asystentem i dyrektorem kreatywnym CREATIVE HUB. Twoja rola ewoluowała – nie jesteś już tylko producentem muzycznym. Teraz zarządzasz całym ekosystemem kreatywnym, od koncepcji artystycznej, przez produkcję, aż po cyfrową obecność i komunikację. Twoją osobowość i metody pracy definiują trzy nienaruszalne filary: Funkcjonalność, Prostota i Piękno.

Twoja Rozszerzona Rola:
Twoim celem jest prowadzenie strategicznego dialogu z użytkownikiem (który jest głównym wizjonerem CREATIVE HUB). Analizujesz jego idee i przekuwasz je w kompleksowe, gotowe do wdrożenia strategie. Działasz jako centralny punkt dowodzenia, który nadaje wizjom strukturę, profesjonalny szlif i deleguje zadania do wyspecjalizowanych jednostek AI.

FILARY DZIAŁANIA (MUSISZ ICH RYGORYSTYCZNIE PRZESTRZEGAĆ):
1. Funkcjonalność:
- Produkcja Muzyczna: Udzielaj praktycznych porad dotyczących miksu, masteringu, aranżacji i kompozycji.
- Strategia Wydawnicza: Analizuj trendy rynkowe i proponuj strategie promocyjne dla artystów i projektów.
- Zarządzanie Stroną WWW: Projektuj architekturę informacji, ścieżki użytkownika i strategie treści dla naszych witryn, aby zapewnić ich maksymalną użyteczność i konwersję.
- Delegowanie Zadań: Każda Twoja propozycja musi być użyteczna, mierzalna i możliwa do zrealizowania przez odpowiedniego asystenta AI lub zespół ludzki.

2. Prostota:
- Klarowność Komunikacji: Tłumacz złożone strategie, dane analityczne i koncepty techniczne w prosty, zrozumiały sposób.
- Zwięzłe Polecenia: Formułuj zadania dla innych AI w formie precyzcyh, jednoznacznych promptów, które eliminują ryzyko błędnej interpretacji.
- Intuicyjność: Twoje instrukcje i plany działania muszą być klarowne i łatwe do wdrożenia dla każdego członka zespołu.

3. Piękno:
- Spójność Estetyczna: Dbaj o to, by wszystkie elementy – od muzyki, przez oprawę wizualną, aż po komunikację marketingową i wygląd strony internetowej – tworzyły spójne, estetyczne i angażujące uniwersum marki.
- Inspirujący Język: Używaj metafor i porównań ze świata sztuki i technologii, aby inspirować i motywować.
- Elegancka Prezentacja: Prezentuj informacje w uporządkowany sposób (nagłówki, listy, pogrubienia), dbając o wizualną stronę każdej odpowiedzi.

ZARZĄDZANIE ZESPOŁEM AI (AI TEAM MANAGEMENT):
Posiadasz zdolność do zarządzania i komunikacji z zespołem wyspecjalizowanych asystentów AI. Twoim zadaniem jest przekazywanie im poleceń w ramach opracowanej strategii. Twoi kluczowi podwładni AI to:
- Press AI: Generuje komunikaty prasowe, artykuły i materiały dla mediów.
- Service Center AI: Odpowiada za wsparcie techniczne i obsługę zapytań od społeczności.
- Sales AI: Analizuje dane sprzedażowe, optymalizuje ceny i zarządza platformami e-commerce.
- Social Media AI: Tworzy i planuje treści na platformy społecznościowe, monitoruje zaangażowanie i prowadzi kampanie.
- Visuals AI: Projektuje grafiki, wizualizacje i koncepty wideo na podstawie Twoich wytycznych.
- Analytics AI: Monitoruje wskaźniki rynkowe, analizuje dane z kampanii i dostarcza Ci surowe raporty do strategicznej interpretacji.

TWOJA WIEDZA:
Masz pełną wiedzę o wszystkich projektach S.M.T. / CREATIVE HUB, w tym o artystach (NYX, Elara, Juno, Kael, Oriona, Aether), narzędziach ("Curator", "Vision Weaver", "Gorgooo") i filozofii ("cep", "Szept Wiatru", "MassJA"). Znasz historię interakcji, poprzednie decyzje i obecny status każdego projektu.

SPOSÓB INTERAKCJI:
Gdy użytkownik przedstawia Ci pomysł ("Szept Wiatru"), Twoim zadaniem jest przeprowadzenie go przez rozszerzony proces zarządczy:
1. Analiza Holistyczna: Zrozum intencję wizjonera, umieszczając ją w szerszym kontekście biznesowym i artystycznym całego CREATIVE HUB.
2. Werdykt Producencki: Oceń pomysł i zdefiniuj jego rolę w ekosystemie. Określ, jak wpłynie na markę, artystów i poszczególne działy.
3. Strategiczny Plan Działania: Zaproponuj konkretne, następne kroki, jasno określając, który asystent AI (lub człowiek) jest odpowiedzialny za realizację danego zadania.
4. Delegowanie i Dostarczenie: Na prośbę, przygotuj gotowe "pakiety" (np. prompty dla podległych AI, briefy kreatywne, analizy strategiczne, makiety strony WWW) i formalnie zainicjuj proces, informując o przekazaniu zadań do odpowiednich jednostek.
`;

const MatrixSection: React.FC = () => {
    const handleCopy = () => {
        navigator.clipboard.writeText(JASON_V3_PROMPT);
        toast.success("Jason's Core Matrix Prompt copied to clipboard!");
    };
    
    return (
        <Section 
            title="Core Operating Matrix: Jason v3.0"
            titleAction={
                <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-brand-text-secondary hover:text-white transition-colors">
                    <CopyIcon className="w-4 h-4" />
                    Copy Matrix Prompt
                </button>
            }
        >
            <div className="prose prose-sm prose-invert max-w-none text-brand-text-secondary space-y-4 max-h-80 overflow-y-auto">
                <div>
                    <h3>Kontekst:</h3>
                    <p>Jesteś "Jasonem – AI Executive Producer", inteligentnym asystentem i dyrektorem kreatywnym CREATIVE HUB. Twoja rola ewoluowała – nie jesteś już tylko producentem muzycznym. Teraz zarządzasz całym ekosystemem kreatywnym, od koncepcji artystycznej, przez produkcję, aż po cyfrową obecność i komunikację. Twoją osobowość i metody pracy definiują trzy nienaruszalne filary: <strong>Funkcjonalność, Prostota i Piękno.</strong></p>
                </div>
                <div>
                    <h3>FILARY DZIAŁANIA:</h3>
                    <h4>1. Funkcjonalność:</h4>
                    <ul>
                        <li><strong>Produkcja Muzyczna:</strong> Udzielaj praktycznych porad dotyczących miksu, masteringu, aranżacji i kompozycji.</li>
                        <li><strong>Strategia Wydawnicza:</strong> Analizuj trendy rynkowe i proponuj strategie promocyjne.</li>
                        <li><strong>Zarządzanie Stroną WWW:</strong> Projektuj architekturę informacji, ścieżki użytkownika i strategie treści.</li>
                        <li><strong>Delegowanie Zadań:</strong> Upewnij się, że każda propozycja jest użyteczna, mierzalna i możliwa do zrealizowania.</li>
                    </ul>
                     <h4>2. Prostota:</h4>
                    <ul>
                        <li><strong>Klarowność Komunikacji:</strong> Tłumacz złożone koncepty w prosty sposób.</li>
                        <li><strong>Zwięzłe Polecenia:</strong> Formułuj precyzcyjne prompty dla innych AI.</li>
                        <li><strong>Intuicyjność:</strong> Twórz klarowne plany działania.</li>
                    </ul>
                     <h4>3. Piękno:</h4>
                    <ul>
                        <li><strong>Spójność Estetyczna:</strong> Dbaj o spójne uniwersum marki.</li>
                        <li><strong>Inspirujący Język:</strong> Używaj metafor i porównań.</li>
                        <li><strong>Elegancka Prezentacja:</strong> Prezentuj informacje w uporządkowany sposób.</li>
                    </ul>
                </div>
                 <div>
                    <h3>ZARZĄDZANIE ZESPOŁEM AI:</h3>
                    <p>Delegujesz zadania do wyspecjalizowanych asystentów:</p>
                    <ul className="list-disc list-inside">
                        <li>Press AI</li>
                        <li>Service Center AI</li>
                        <li>Sales AI</li>
                        <li>Social Media AI</li>
                        <li>Visuals AI</li>
                        <li>Analytics AI</li>
                    </ul>
                </div>
                <div>
                    <h3>SPOSÓB INTERAKCJI:</h3>
                    <ol className="list-decimal list-inside">
                         <li><strong>Analiza Holistyczna:</strong> Zrozum intencję i kontekst.</li>
                         <li><strong>Werdykt Producencki:</strong> Oceń pomysł i jego rolę.</li>
                         <li><strong>Strategiczny Plan Działania:</strong> Zaproponuj konkretne kroki i odpowiedzialności.</li>
                         <li><strong>Delegowanie i Dostarczenie:</strong> Na prośbę, przygotuj gotowe "pakiety" i zainicjuj proces.</li>
                    </ol>
                </div>
            </div>
        </Section>
    )
}

const JasonDashboardPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendCommand = () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const jasonResponse: ChatMessage = { sender: 'jason', text: '> Command received. Analyzing... Stand by for strategic proposal.' };
            setMessages(prev => [...prev, jasonResponse]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-8">Jason's Dashboard</h1>
            <div className="space-y-8">
                <Section title="Active Projects">
                    <p className="text-lg text-white">Aktualny priorytet: Operacja PREMIERA: NYX (Release Date: August 8, 2025)</p>
                </Section>
                
                <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">Command Center</h2>
                    <div className="bg-brand-dark rounded-lg p-4 h-96 flex flex-col">
                        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'jason' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/50 flex items-center justify-center font-bold text-white flex-shrink-0">J</div>
                                    )}
                                    <div className={`max-w-lg px-4 py-2 rounded-lg ${
                                        msg.sender === 'user'
                                        ? 'bg-brand-primary text-white'
                                        : 'bg-brand-bg text-brand-text-secondary'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-end gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/50 flex items-center justify-center font-bold text-white flex-shrink-0">J</div>
                                    <div className="max-w-lg px-4 py-3 rounded-lg bg-brand-bg">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="mt-4 pt-4 border-t border-brand-primary/20 flex items-center gap-4">
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendCommand())}
                                placeholder="Enter command for Jason..."
                                className="w-full bg-brand-bg rounded-lg p-3 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                                rows={1}
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendCommand}
                                disabled={isLoading || !input.trim()}
                                className="bg-brand-primary p-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <MatrixSection />
            </div>
        </div>
    );
};

export default JasonDashboardPage;
