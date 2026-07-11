import { useState, useRef, useEffect } from 'react';
import {
  Heart, MessageCircle, MapPin, Utensils, Users, Hotel, Sparkles,
  Send, Moon, Sun, ChevronRight, X, User, Globe, Coffee, Wine,
  Sunset, Music, BookOpen, Star, ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface UserProfile {
  nationality: string;
  age: string;
  goals: string;
  interestedIn: 'men' | 'women' | 'both' | '';
  orientation: 'straight' | 'gay' | 'bi' | '';
  preferences: string;
  name: string;
}

const topicSuggestions = [
  { icon: Utensils, title: 'Restaurants for Dates', desc: 'Best spots by price & vibe', query: 'What are the best restaurants in Lisbon for a romantic date?' },
  { icon: MapPin, title: 'Hidden Romantic Spots', desc: 'Secret places locals love', query: 'What are some hidden romantic spots in Lisbon for dates?' },
  { icon: Sparkles, title: 'Unique Date Ideas', desc: 'Memorable experiences', query: 'What are some unique date experiences I can plan in Lisbon?' },
  { icon: Users, title: 'Meeting Singles', desc: 'Best places & events', query: 'Where can I meet single people in Lisbon?' },
  { icon: Coffee, title: 'Conversation Tips', desc: 'How to break the ice', query: 'How do I start conversations with people in Lisbon?' },
  { icon: Hotel, title: 'Hotels & Stays', desc: 'Guest-friendly options', query: 'What are the best hotels in Lisbon for bringing guests?' },
  { icon: BookOpen, title: 'Dating Culture', desc: 'Portuguese dating scene', query: 'What should I know about the dating culture in Portugal?' },
  { icon: Heart, title: 'Understanding Locals', desc: 'Tips for Portuguese partners', query: 'What are Portuguese men/women like in relationships?' },
];

const quickQuestions = [
  "Best budget-friendly date restaurants?",
  "Where do expats hang out in Lisbon?",
  "Romantic sunset spots?",
  "How to approach someone at a cafe?",
];

const lisbonData = {
  restaurants: {
    budget: [
      { name: "Cervejaria Ramiro", vibe: "Legendary seafood, lively atmosphere", price: "€€", best: "Casual fun dates" },
      { name: "Ponto Final", vibe: "Riverside dining in Almada", price: "€€", best: "Sunset dinner with views" },
      { name: "A Cevicheria", vibe: "Trendy Peruvian, creative cocktails", price: "€€", best: "Impress foodies" },
    ],
    mid: [
      { name: "Belcanto", vibe: "2 Michelin stars, intimate", price: "€€€€", best: "Special occasions" },
      { name: "Feitoria", vibe: "Elegant, river views", price: "€€€", best: "Romantic evening" },
      { name: "100 Maneiras", vibe: "Tasting menu, storytelling", price: "€€€", best: "Adventurous eaters" },
    ],
    unique: [
      { name: "Secret Garden", vibe: "Hidden courtyard, fairy lights", price: "€€", best: "First dates" },
      { name: "Wine & Wine", vibe: "Natural wines, cozy basement", price: "€€", best: "Wine lovers" },
    ]
  },
  romanticSpots: [
    { name: "Miradouro da Senhora do Monte", desc: "Highest viewpoint, stunning sunsets", tip: "Bring wine, go before sunset" },
    { name: "Jardim do Torel", desc: "Hidden garden with pool, ocean views", tip: "Quiet, perfect for picnics" },
    { name: "Palácio de Sintra", desc: "Day trip, fairytale palace", tip: "25 min train, magical for romance" },
    { name: "Praia do Guincho", desc: "Wild beach, dramatic cliffs", tip: "Sunset walks, beach bars nearby" },
  ],
  meetSingles: [
    { place: "Bairro Alto", desc: "Nightlife hub, bars and Fado houses", crowd: "Mixed ages, tourists & locals" },
    { place: "LX Factory", desc: "Creative hub, rooftop bars", crowd: "Young professionals, creatives" },
    { place: "Timeout Market", desc: "Food hall, communal seating", crowd: "Easy to strike conversations" },
    { place: "Praça do Príncipe Real", desc: "Trendy area, brunch spots", crowd: "Expats, digital nomads" },
  ],
  events: [
    { name: "Web Summit", type: "Tech conference", when: "November", crowd: "Professionals, entrepreneurs" },
    { name: "Lisbon Digital Nomads Meetup", type: "Weekly meetup", when: "Various locations", crowd: "Remote workers, expats" },
    { name: "Fado in Chiado", type: "Live music", when: "Nightly", crowd: "Culture seekers" },
    { name: "Ribeira Market", type: "Food & social", when: "Weekends", crowd: "Foodies, locals" },
  ],
  culture: {
    portuguese: {
      men: "Portuguese men tend to be traditional but warm. They often take initiative but appreciate reciprocity. Family-oriented, may introduce you early. Can be reserved initially but very affectionate once comfortable. Value loyalty and commitment.",
      women: "Portuguese women are often independent yet family-oriented. They appreciate chivalry but also equality. May be more reserved than other Southern Europeans. Value genuine connection over flashy displays. Often multilingual and culturally aware."
    },
    expats: {
      british: "Large community in Cascais. Often social, appreciate humor. Pub culture, sports events for meeting.",
      french: "Growing community. Often in creative fields. Wine bars, art events for meeting.",
      brazilian: "Very social, warm culture. Music, dance events. Often in nightlife areas.",
      american: "Tech and startup scene. Networking events, coworking spaces. Open and direct communication style."
    }
  },
  hotels: {
    budget: [
      { name: "Lisboa Central Hotel", price: "€60-90", feature: "Central, modern, guest-friendly" },
      { name: "Hotel Borges Chiado", price: "€70-100", feature: "Historic charm, great location" },
    ],
    mid: [
      { name: "The Lumiares", price: "€120-180", feature: "Apartments, rooftop bar, discreet" },
      { name: "Hotel Santa Justa", price: "€100-150", feature: "Rooftop pool, central" },
    ],
    luxury: [
      { name: "Bairro Alto Hotel", price: "€250+", feature: "Rooftop views, very romantic" },
      { name: "Four Seasons Ritz", price: "€350+", feature: "Classic luxury, impeccable service" },
    ]
  }
};

function generateResponse(query: string, profile: UserProfile): string {
  const q = query.toLowerCase();
  
  if (q.includes('restaurant') || q.includes('dinner') || q.includes('food')) {
    const budget = q.includes('budget') || q.includes('cheap') ? 'budget' : q.includes('luxury') || q.includes('fancy') ? 'mid' : 'all';
    let response = "🍽️ **Great Restaurants for Dates in Lisbon:**\n\n";
    
    if (budget === 'budget' || budget === 'all') {
      response += "**Budget-Friendly (€€):**\n";
      lisbonData.restaurants.budget.forEach(r => {
        response += `• **${r.name}** - ${r.vibe}. Best for: ${r.best}\n`;
      });
    }
    if (budget === 'mid' || budget === 'all') {
      response += "\n**Mid to High-End (€€€+):**\n";
      lisbonData.restaurants.mid.forEach(r => {
        response += `• **${r.name}** - ${r.vibe}. Best for: ${r.best}\n`;
      });
    }
    response += "\n💡 **Pro tip:** Book ahead for weekend evenings. Many places close on Sundays or Mondays.";
    return response;
  }
  
  if (q.includes('hidden') || q.includes('secret') || q.includes('romantic spot')) {
    let response = "🌅 **Hidden Romantic Spots in Lisbon:**\n\n";
    lisbonData.romanticSpots.forEach(spot => {
      response += `📍 **${spot.name}**\n${spot.desc}\n💡 ${spot.tip}\n\n`;
    });
    return response;
  }
  
  if (q.includes('unique') || q.includes('experience') || q.includes('date idea')) {
    return `✨ **Unique Date Experiences in Lisbon:**

🚋 **Tram 28 at Sunset** - Take the vintage tram through historic neighborhoods. Get off at Estrela for garden walks.

🍷 **Wine Tasting in Alentejo** - Day trip to wine region, 1 hour away. Many offer couples packages.

🛥️ **Sunset Sailing** - Tagus River cruises depart from Belém. Champagne options available.

🎭 **Fado Night in Alfama** - Intimate venues with dinner. Very Portuguese, very romantic.

🏖️ **Beach Day in Cascais** - 30 min train ride. Beach clubs, seafood lunch, cliff walks.

🎨 **Street Art Tour in Marvila** - Trendy area, cool bars after. Great conversation starter.

${profile.interestedIn === 'women' || profile.interestedIn === 'both' ? "\n💡 Many women appreciate thoughtful planning - consider a picnic at Miradouro da Graça!" : ""}
${profile.interestedIn === 'men' || profile.interestedIn === 'both' ? "\n💡 Portuguese men often enjoy active dates - consider surfing in Costa da Caparica!" : ""}`;
  }
  
  if (q.includes('meet') || q.includes('single') || q.includes('where')) {
    let response = "👥 **Best Places to Meet Singles in Lisbon:**\n\n";
    lisbonData.meetSingles.forEach(place => {
      response += `📍 **${place.place}**\n${place.desc}\nCrowd: ${place.crowd}\n\n`;
    });
    response += "\n📅 **Events Worth Checking:**\n";
    lisbonData.events.forEach(event => {
      response += `• **${event.name}** (${event.when}) - ${event.crowd}\n`;
    });
    
    if (profile.goals) {
      response += `\n\n🎯 Based on your goals (${profile.goals}), I'd especially recommend LX Factory and the Digital Nomads Meetup - great for meeting like-minded people!`;
    }
    return response;
  }
  
  if (q.includes('conversation') || q.includes('start') || q.includes('approach') || q.includes('talk')) {
    return `💬 **Starting Conversations in Lisbon:**

**In Cafés:** "Is that the famous pastel de nata? First time trying one!" (Works everywhere - Portuguese love their food)

**At Bars:** "What would you recommend? I'm new to Lisbon." (People love sharing local tips)

**At Events:** "What brings you here tonight?" (Open-ended, genuine)

**Cultural Context:**
• Portuguese people are generally friendly but may seem reserved initially
• They appreciate genuine interest in their culture
• Humor works well, but avoid stereotypes
• Being a foreigner is often seen as interesting, not off-putting

${profile.nationality ? `\n🎯 As someone from ${profile.nationality}, you can share your perspective - Portuguese are curious about other cultures!` : ""}

**Key Phrases:**
• "Olá" (Hello)
• "Como estás?" (How are you?)
• "És de Lisboa?" (Are you from Lisbon?)

Even broken Portuguese is appreciated and shows effort!`;
  }
  
  if (q.includes('hotel') || q.includes('stay') || q.includes('guest')) {
    let response = "🏨 **Hotels for Romantic Getaways:**\n\n";
    response += "**Budget-Friendly:**\n";
    lisbonData.hotels.budget.forEach(h => {
      response += `• **${h.name}** (${h.price}) - ${h.feature}\n`;
    });
    response += "\n**Mid-Range:**\n";
    lisbonData.hotels.mid.forEach(h => {
      response += `• **${h.name}** (${h.price}) - ${h.feature}\n`;
    });
    response += "\n**Luxury:**\n";
    lisbonData.hotels.luxury.forEach(h => {
      response += `• **${h.name}** (${h.price}) - ${h.feature}\n`;
    });
    response += "\n\n💡 **Tip:** Apartments (Airbnb, The Lumiares) offer more privacy than hotels for bringing guests.";
    return response;
  }
  
  if (q.includes('culture') || q.includes('dating scene') || q.includes('portugal')) {
    return `🇵🇹 **Dating Culture in Portugal:**

**Portuguese Dating Style:**
• More traditional than Northern Europe, less formal than Southern
• Family introductions happen relatively early if serious
• PDA is common and accepted
• Splitting bills is common among younger people, but offering to pay is appreciated

**Digital Nomad Scene:**
• Large expat community - very open to dating foreigners
• Events and coworking spaces are great for meeting
• Many are looking for genuine connections, not just flings

**Key Cultural Notes:**
• "Saudade" - a bittersweet longing, influences romantic outlook
• Portuguese can be indirect - learn to read between lines
• Loyalty and commitment are highly valued
• Sunday family lunches are sacred for many

${profile.orientation === 'gay' ? "\n🌈 **LGBTQ+ Note:** Portugal is one of the most progressive countries in Europe. Same-sex marriage is legal since 2010. Príncipe Real and Bairro Alto have gay-friendly bars and events." : ""}`;
  }
  
  if (q.includes('portuguese men') || q.includes('portuguese man')) {
    return `👨 **Dating Portuguese Men:**

${lisbonData.culture.portuguese.men}

**What Works:**
• Show interest in his family and friends
• Be genuine - they value authenticity
• Share meals together - food is love language
• Don't play hard to get - they may not chase

**Potential Challenges:**
• May be less emotionally expressive initially
• Traditional views on gender roles (varies by person)
• Family opinions can matter a lot

**Green Flags:**
• Introduces you to friends early
• Makes effort to communicate despite language barriers
• Shows genuine interest in your culture`;
  }
  
  if (q.includes('portuguese women') || q.includes('portuguese woman')) {
    return `👩 **Dating Portuguese Women:**

${lisbonData.culture.portuguese.women}

**What Works:**
• Be respectful but confident
• Show genuine interest in her life, not just appearance
• Family matters - show respect for her relationships
• Good conversation and humor go a long way

**Potential Challenges:**
• May seem reserved at first - patience is key
• Strong family ties mean scheduling around family time
• Can be traditional about certain things

**Green Flags:**
• She makes time for you despite busy schedule
• Introduces you to her circle
• Shares personal stories and dreams`;
  }
  
  if (q.includes('expat') || q.includes('british') || q.includes('french') || q.includes('american') || q.includes('brazilian')) {
    return `🌍 **Dating in the Expat Community:**

**British Expats:**
${lisbonData.culture.expat.british}

**French Expats:**
${lisbonData.culture.expat.french}

**Brazilian Community:**
${lisbonData.culture.expat.brazilian}

**American Expats:**
${lisbonData.culture.expat.american}

**Where to Meet Expats:**
• Coworking spaces (Second Home, Heden)
• Expat Facebook groups
• Language exchange meetups
• International parties at Lux Frágil

💡 **Tip:** Dating within the expat community can be easier for cultural understanding, but don't limit yourself - Portuguese are generally very open to dating foreigners!`;
  }
  
  if (q.includes('sunset') || q.includes('viewpoint') || q.includes('miradouro')) {
    return `🌅 **Best Sunset Spots for Romance:**

1. **Miradouro da Senhora do Monte** - Highest point, 360° views. Arrive 30 min before sunset.

2. **Miradouro de Santa Catarina** - Adamastor statue, often has live music, young crowd.

3. **Praia do Guincho** - Beach sunset, dramatic waves. 30 min from center.

4. **Cais das Colunas** - By the river, classic Lisbon backdrop.

5. **Cristo Rei** - Across the bridge, view of entire city.

💡 **Pro tip:** Bring a blanket and wine. Portuguese often do "copo de sol" (sunset drink) - it's a thing!`;
  }
  
  return `I'd be happy to help you with dating in Lisbon! Here are some things I can assist with:

• 🍽️ Restaurant recommendations for dates
• 🌅 Romantic spots and viewpoints
• 👥 Where to meet singles
• 💬 Conversation tips
• 🏨 Hotel recommendations
• 🇵🇹 Cultural insights about dating
• 👨👩 Understanding Portuguese men/women

What would you like to know more about?`;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showProfile, setShowProfile] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    nationality: '',
    age: '',
    goals: '',
    interestedIn: '',
    orientation: '',
    preferences: '',
    name: '',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showTopics, setShowTopics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleProfileSubmit = () => {
    setShowProfile(false);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Welcome${profile.name ? ` ${profile.name}` : ''}! 💙 I'm your Lisbon dating guide for digital nomads.

${profile.nationality ? `Great to have someone from ${profile.nationality}! ` : ''}I'm here to help you navigate the dating scene in Lisbon.

${profile.goals ? `I'll keep in mind you're looking for: ${profile.goals}. ` : ''}
${profile.interestedIn ? `I'll tailor my advice for someone interested in ${profile.interestedIn}. ` : ''}

**Where would you like to start?** You can ask me about:
• 🍽️ Restaurants for dates
• 🌅 Romantic spots
• 👥 Meeting singles
• 💬 Conversation tips
• 🇵🇹 Dating culture

Or click a topic below to explore!`
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    const response = generateResponse(input, profile);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };
    
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  const handleTopicClick = (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };
    
    const response = generateResponse(query, profile);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };
    
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setShowTopics(false);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    };
    
    const response = generateResponse(question, profile);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };
    
    setMessages(prev => [...prev, userMessage, assistantMessage]);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]" data-theme={theme}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Lisbon Dating Guide</h1>
              <p className="text-xs text-[var(--muted)]">For Digital Nomads</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!showProfile && (
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 rounded-xl hover:bg-[var(--border)] transition-colors"
                aria-label="Edit profile"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-[var(--border)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Setup */}
        {showProfile && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Tell me about yourself</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">This helps me give personalized advice</p>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={() => setShowProfile(false)}
                    className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="What should I call you?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Nationality</label>
                  <input
                    type="text"
                    value={profile.nationality}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    placeholder="Where are you from?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Age Range</label>
                  <select
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                  >
                    <option value="">Select age range</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-45">36-45</option>
                    <option value="46+">46+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Interested In</label>
                  <div className="flex gap-2">
                    {['men', 'women', 'both'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setProfile({ ...profile, interestedIn: option as UserProfile['interestedIn'] })}
                        className={`flex-1 py-2 px-4 rounded-xl border transition-all ${
                          profile.interestedIn === option
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'border-[var(--border)] hover:border-[var(--accent)]'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Orientation</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'straight', label: 'Straight' },
                      { value: 'gay', label: 'Gay' },
                      { value: 'bi', label: 'Bi' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setProfile({ ...profile, orientation: option.value as UserProfile['orientation'] })}
                        className={`flex-1 py-2 px-4 rounded-xl border transition-all ${
                          profile.orientation === option.value
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'border-[var(--border)] hover:border-[var(--accent)]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">What are you looking for?</label>
                  <textarea
                    value={profile.goals}
                    onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                    placeholder="e.g., Serious relationship, casual dating, making connections..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">What do you appreciate in people?</label>
                  <textarea
                    value={profile.preferences}
                    onChange={(e) => setProfile({ ...profile, preferences: e.target.value })}
                    placeholder="e.g., Sense of humor, intelligence, adventure..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleProfileSubmit}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Exploring</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!showProfile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topics Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="glass rounded-2xl p-4 sticky top-24">
                <button
                  onClick={() => setShowTopics(!showTopics)}
                  className="w-full flex items-center justify-between mb-4 lg:mb-0 lg:pointer-events-none"
                >
                  <h3 className="font-semibold">Explore Topics</h3>
                  <ChevronRight className={`w-4 h-4 lg:hidden transition-transform ${showTopics ? 'rotate-90' : ''}`} />
                </button>
                
                <div className={`space-y-2 ${showTopics ? 'block' : 'hidden lg:block'}`}>
                  {topicSuggestions.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => handleTopicClick(topic.query)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--border)] transition-all text-left group"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="p-2 rounded-lg bg-[var(--border)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                        <topic.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{topic.title}</p>
                        <p className="text-xs text-[var(--muted)]">{topic.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Chat Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="mb-4 animate-fade-in-up">
                  <p className="text-sm text-[var(--muted)] mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="px-3 py-1.5 rounded-full border border-[var(--border)] text-sm hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="glass rounded-2xl p-4 min-h-[400px] max-h-[60vh] overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <MessageCircle className="w-12 h-12 text-[var(--muted)] mb-4" />
                    <p className="text-[var(--muted)]">Start a conversation about dating in Lisbon</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.role === 'user'
                              ? 'bg-[var(--accent)] text-white'
                              : 'bg-[var(--border)]'
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about dating in Lisbon..."
                  className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 py-3 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-[var(--muted)]">
          <p>Made with 💙 for digital nomads in Lisbon</p>
        </div>
      </footer>
    </div>
  );
}
