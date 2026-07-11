import { useState, useRef, useEffect } from 'react';
import {
  Heart, MessageCircle, MapPin, Utensils, Users, Hotel, Sparkles,
  Send, Moon, Sun, ChevronRight, X, User, Coffee, Wine,
  Sunset, Music, BookOpen, Star, ArrowRight, ExternalLink,
  Navigation, Filter, GlassWater, PartyPopper, Globe, Calendar,
  Briefcase, Laptop, Camera, Bike, Dumbbell, Languages, Palette,
  Smartphone, TrendingUp, Award, Zap, Target
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

// Comprehensive dating apps research for Portugal
const datingAppsResearch = {
  apps: [
    {
      name: "Tinder",
      popularity: "Most Popular",
      usersInPortugal: "2+ million registered users",
      demographics: "18-35, majority under 30",
      bestFor: "Casual dating, quick connections, expats meeting locals",
      effectiveness: "High for casual, Medium for serious",
      cost: "Free (Gold/Plus €15-30/month)",
      portugueseTips: [
        "Portuguese users often state intentions in bio - read carefully",
        "Many locals use it for both casual and serious dating",
        "English profiles attract expats, Portuguese profiles attract locals",
        "Best time to swipe: 8-11pm local time",
        "Weekend activity peaks Friday-Saturday nights"
      ],
      successRate: "60-70% match-to-date conversion if active",
      localInsight: "In Lisbon, Tinder is the default app. Most Portuguese under 35 have used it. Expats find it easiest for meeting locals due to sheer user volume.",
      link: "https://www.google.com/search?q=Tinder+Portugal+Lisbon+dating"
    },
    {
      name: "Bumble",
      popularity: "Fast Growing",
      usersInPortugal: "500k+ active users",
      demographics: "25-40, slightly more educated/professional",
      bestFor: "Serious dating, women who want control, expat community",
      effectiveness: "High for serious relationships",
      cost: "Free (Premium €25-35/month)",
      portugueseTips: [
        "Women must message first - Portuguese women appreciate this",
        "Bumble BFF mode great for making friends first",
        "Higher quality profiles than Tinder",
        "More expats use Bumble than locals",
        "Good for networking through Bumble Bizz"
      ],
      successRate: "50-60% match-to-date, higher quality dates",
      localInsight: "Bumble has become the 'serious dating' alternative to Tinder in Lisbon. Popular among American and British expats. Portuguese women increasingly joining.",
      link: "https://www.google.com/search?q=Bumble+Portugal+Lisbon+dating"
    },
    {
      name: "Hinge",
      popularity: "Rising Star",
      usersInPortugal: "200k+ users, growing rapidly",
      demographics: "28-45, professionals, relationship-focused",
      bestFor: "Serious relationships, meaningful connections",
      effectiveness: "Very High for serious relationships",
      cost: "Free (Preferred €15-25/month)",
      portugueseTips: [
        "Prompts help start conversations - use them",
        "Portuguese users appreciate thoughtful responses",
        "Less casual hookups than Tinder",
        "Good for meeting educated locals",
        "Comment on specific photos/prompt answers"
      ],
      successRate: "70-80% for serious relationship seekers",
      localInsight: "Hinge launched in Portugal in 2020 and grew fast. The 'designed to be deleted' motto resonates with Portuguese seeking commitment. Still smaller user base but higher quality.",
      link: "https://www.google.com/search?q=Hinge+Portugal+Lisbon+dating"
    },
    {
      name: "Inner Circle",
      popularity: "Premium/Niche",
      usersInPortugal: "50k+ approved members",
      demographics: "30-45, professionals, higher income",
      bestFor: "Serious dating, professionals, quality over quantity",
      effectiveness: "High for professional dating",
      cost: "Free basic (Full €40-60/month)",
      portugueseTips: [
        "Application process filters users",
        "Events organized in Lisbon monthly",
        "Good for meeting successful locals",
        "LinkedIn verification required",
        "Smaller but curated community"
      ],
      successRate: "40-50% but higher quality matches",
      localInsight: "Inner Circle has a strong Lisbon community. They host exclusive events at upscale venues. Great for meeting Portuguese professionals and successful expats.",
      link: "https://www.google.com/search?q=Inner+Circle+dating+Lisbon+Portugal"
    },
    {
      name: "Badoo",
      popularity: "Popular with Locals",
      usersInPortugal: "1+ million users",
      demographics: "18-30, more local Portuguese",
      bestFor: "Casual dating, meeting Portuguese locals",
      effectiveness: "Medium-High for casual",
      cost: "Free (Premium €10-20/month)",
      portugueseTips: [
        "Very popular with Portuguese locals",
        "Less expat presence than Tinder",
        "Video chat feature useful",
        "Location-based matching strong",
        "Good for practicing Portuguese"
      ],
      successRate: "50-60% match-to-date",
      localInsight: "Badoo has been in Portugal longer than Tinder. Many Portuguese who don't use Tinder use Badoo. More local crowd, fewer expats. Good for authentic Portuguese dating experience.",
      link: "https://www.google.com/search?q=Badoo+Portugal+Lisbon"
    },
    {
      name: "OkCupid",
      popularity: "Niche/Thoughtful",
      usersInPortugal: "100k+ users",
      demographics: "25-40, intellectuals, alternative types",
      bestFor: "Deep connections, shared values, LGBTQ+ friendly",
      effectiveness: "Medium-High for compatibility matching",
      cost: "Free (Premium €15-25/month)",
      portugueseTips: [
        "Questionnaire helps find compatible matches",
        "Very LGBTQ+ friendly",
        "Portuguese users tend to be thoughtful",
        "Good for finding shared interests",
        "Smaller but engaged community"
      ],
      successRate: "60-70% for value-aligned dating",
      localInsight: "OkCupid has a smaller but dedicated Portuguese user base. Great for finding people with similar values, political views, or lifestyle preferences. Strong LGBTQ+ community.",
      link: "https://www.google.com/search?q=OkCupid+Portugal+Lisbon"
    },
    {
      name: "Grindr",
      popularity: "Essential for Gay Men",
      usersInPortugal: "200k+ users",
      demographics: "18-50, gay and bi men",
      bestFor: "Gay dating, quick connections, LGBTQ+ community",
      effectiveness: "Very High for gay men",
      cost: "Free (XTRA €15-25/month)",
      portugueseTips: [
        "Largest gay dating app in Portugal",
        "Lisbon has active community",
        "Príncipe Real area is gay-friendly hub",
        "Portuguese men often discreet initially",
        "Tap feature popular locally"
      ],
      successRate: "80%+ for gay men seeking connections",
      localInsight: "Grindr is the primary app for gay men in Lisbon. Portugal is very LGBTQ+ friendly (same-sex marriage since 2010). Príncipe Real neighborhood is the gay area with bars and community.",
      link: "https://www.google.com/search?q=Grindr+Lisbon+Portugal+gay+dating"
    },
    {
      name: "HER",
      popularity: "Leading for LGBTQ+ Women",
      usersInPortugal: "30k+ users",
      demographics: "18-40, lesbian, bi, queer women",
      bestFor: "LGBTQ+ women dating, community events",
      effectiveness: "High for LGBTQ+ women",
      cost: "Free (Premium €15-20/month)",
      portugueseTips: [
        "Growing community in Lisbon",
        "Events feature helps meet people",
        "Smaller user base but engaged",
        "Good for making friends too",
        "Combine with local LGBTQ+ events"
      ],
      successRate: "50-60% for LGBTQ+ women",
      localInsight: "HER is the main app for LGBTQ+ women in Portugal. Community is smaller than gay men's but growing. Lisbon has lesbian bars and monthly events - check Facebook groups.",
      link: "https://www.google.com/search?q=HER+dating+app+Portugal+Lisbon"
    },
    {
      name: "Happn",
      popularity: "Location-Based",
      usersInPortugal: "300k+ users",
      demographics: "18-35, urban dwellers",
      bestFor: "Meeting people you cross paths with, serendipity",
      effectiveness: "Medium in dense areas like Lisbon",
      cost: "Free (Premium €15-25/month)",
      portugueseTips: [
        "Works best in central Lisbon",
        "Shows people you physically passed",
        "Good for meeting locals in your area",
        "Less active than Tinder/Bumble",
        "Fun for 'I saw you at that café' moments"
      ],
      successRate: "30-40% due to smaller active user base",
      localInsight: "Happn works well in Lisbon's dense center where you cross many people daily. Fun concept but smaller user base. Best combined with other apps.",
      link: "https://www.google.com/search?q=Happn+dating+Lisbon+Portugal"
    },
    {
      name: "Feeld",
      popularity: "Alternative/Open",
      usersInPortugal: "20k+ users",
      demographics: "25-40, open-minded, alternative lifestyles",
      bestFor: "Open relationships, kink, alternative dating",
      effectiveness: "High for niche dating",
      cost: "Free (Majestic €15-20/month)",
      portugueseTips: [
        "Growing community in Lisbon",
        "Very inclusive and open-minded",
        "Good for couples and singles",
        "Discreet and private",
        "Events organized occasionally"
      ],
      successRate: "60-70% for alternative dating",
      localInsight: "Feeld has a small but active Lisbon community. Portugal is relatively open-minded. Good for those seeking non-traditional relationship structures.",
      link: "https://www.google.com/search?q=Feeld+dating+Portugal+Lisbon"
    }
  ],
  
  strategyTips: [
    {
      title: "Multi-App Strategy",
      tip: "Use 2-3 apps simultaneously: Tinder for volume, Bumble/Hinge for quality. Different apps attract different crowds.",
      effectiveness: "High"
    },
    {
      title: "Profile Language",
      tip: "Write bio in English if targeting expats, add Portuguese phrase if targeting locals. 'Aprender português' (learning Portuguese) is attractive.",
      effectiveness: "Medium-High"
    },
    {
      title: "Photo Strategy",
      tip: "Include one photo in Lisbon/Portugal - shows you're local. Portuguese appreciate connection to their country.",
      effectiveness: "High"
    },
    {
      title: "Timing",
      tip: "Best activity: 8-11pm weekdays, all day weekends. Sunday evenings surprisingly active - Portuguese family day ends, people look for dates.",
      effectiveness: "Medium"
    },
    {
      title: "First Message",
      tip: "Reference something specific in their profile. Portuguese appreciate personal attention, not generic 'hey'.",
      effectiveness: "Very High"
    },
    {
      title: "Moving to Date",
      tip: "Portuguese prefer meeting relatively quickly. Suggest coffee or drink within 3-5 messages. Long texting is seen as disinterest.",
      effectiveness: "High"
    },
    {
      title: "Weekend Planning",
      tip: "Thursday is prime for weekend date planning. Portuguese plan social activities Thursday evenings.",
      effectiveness: "Medium"
    }
  ],
  
  culturalNotes: [
    "Portuguese are less 'online' than Americans - expect slower responses",
    "Many Portuguese use apps for genuine dating, not just hookups",
    "Family introductions happen relatively early if relationship develops",
    "Portuguese women often prefer men who take initiative in planning",
    "Splitting bills is common but offering to pay is appreciated",
    "PDA is normal and accepted in Portugal",
    "Sunday is family day - don't expect quick responses",
    "Portuguese may be more reserved initially but warm up quickly"
  ],
  
  expatVsLocal: {
    expatApps: ["Bumble", "Hinge", "Inner Circle", "Tinder (expat filter)"],
    localApps: ["Badoo", "Tinder", "Happn"],
    mixedApps: ["Tinder", "OkCupid", "Bumble"],
    tip: "If you want to date locals, use apps popular with Portuguese. If you want expat community, use Bumble/Hinge. For both, Tinder is best."
  },
  
  ageRecommendations: {
    "18-25": { primary: "Tinder", secondary: ["Badoo", "Bumble"], tip: "Tinder dominates this age group. Badoo has many local Portuguese." },
    "26-35": { primary: "Tinder", secondary: ["Bumble", "Hinge"], tip: "All apps work well. Bumble/Hinge for serious, Tinder for options." },
    "36-45": { primary: "Bumble", secondary: ["Hinge", "Inner Circle"], tip: "Hinge and Inner Circle have quality users in this range." },
    "46+": { primary: "Inner Circle", secondary: ["Bumble", "OkCupid"], tip: "Premium apps have more users seeking commitment." }
  },
  
  orientationRecommendations: {
    straight: { apps: ["Tinder", "Bumble", "Hinge", "Badoo"], tip: "All mainstream apps work well." },
    gay: { apps: ["Grindr", "Tinder", "Hinge", "OkCupid"], tip: "Grindr is essential. Tinder/Hinge have gay options. Portugal is very LGBTQ+ friendly." },
    bi: { apps: ["Tinder", "OkCupid", "Feeld", "Bumble"], tip: "OkCupid and Feeld are most inclusive. Tinder has bi options." },
    lesbian: { apps: ["HER", "OkCupid", "Bumble", "Tinder"], tip: "HER is primary. OkCupid very LGBTQ+ friendly. Community smaller but active." }
  }
};

// Comprehensive meeting places data
const meetingPlaces = {
  nightlife: [
    { name: "Bairro Alto", type: "Nightlife District", desc: "Historic neighborhood with dozens of bars, Fado houses, and clubs. Best Thursday-Saturday nights.", crowd: "Mixed ages 25-40, tourists & locals", tip: "Start at Pensão Amor, end at Lux", link: "https://www.google.com/search?q=Bairro+Alto+Lisbon+bars" },
    { name: "Lux Frágil", type: "Club", desc: "Lisbon's most famous nightclub with top DJs. Industrial-chic design, great for dancing.", crowd: "25-35, fashion-forward, international", tip: "Go after 2am, dress stylish", link: "https://www.google.com/search?q=Lux+Fragil+Lisbon+club" },
    { name: "Pensão Amor", type: "Bar", desc: "Burlesque-themed bar in a former brothel. Unique atmosphere, great cocktails.", crowd: "30-45, creative types, expats", tip: "Ask for the hidden room", link: "https://www.google.com/search?q=Pensao+Amor+Lisbon" },
    { name: "Park Bar", type: "Rooftop Bar", desc: "Hidden rooftop on a parking garage. Stunning sunset views, relaxed vibe.", crowd: "25-35, young professionals", tip: "Arrive before sunset, bring friends", link: "https://www.google.com/search?q=Park+Bar+Lisbon+rooftop" },
    { name: "Red Frog", type: "Speakeasy", desc: "Craft cocktail bar with intimate setting. Perfect for conversation.", crowd: "28-40, cocktail enthusiasts", tip: "Try their signature drinks", link: "https://www.google.com/search?q=Red+Frog+Lisbon+cocktails" },
    { name: "Silício Club", type: "Underground Club", desc: "Electronic music venue in Marvila. Industrial setting, authentic crowd.", crowd: "20-30, music lovers, locals", tip: "Check their Instagram for events", link: "https://www.google.com/search?q=Silicio+Club+Lisbon" },
    { name: "Topo Chiado", type: "Rooftop", desc: "Elegant rooftop with castle views. Great for sophisticated dates.", crowd: "30-50, professionals", tip: "Reserve for weekend evenings", link: "https://www.google.com/search?q=Topo+Chiado+Lisbon" },
    { name: "Monkey Mash", type: "Tiki Bar", desc: "Fun tiki-themed bar with rum cocktails. Lively atmosphere.", crowd: "25-35, fun-loving crowd", tip: "Great for group outings", link: "https://www.google.com/search?q=Monkey+Mash+Lisbon" },
  ],
  
  coworking: [
    { name: "Second Home", type: "Coworking", desc: "Beautiful space in LX Factory with 200+ plants. Very social, great community.", crowd: "Digital nomads, creatives, entrepreneurs", tip: "Join their community events", link: "https://www.google.com/search?q=Second+Home+Lisbon+coworking" },
    { name: "Heden", type: "Coworking", desc: "Multiple locations across Lisbon. Modern, professional atmosphere.", crowd: "Remote workers, startups", tip: "Try the Príncipe Real location", link: "https://www.google.com/search?q=Heden+Lisbon+coworking" },
    { name: "Impact Hub", type: "Coworking", desc: "Social impact focused workspace. Great networking events.", crowd: "Social entrepreneurs, changemakers", tip: "Attend their Thursday socials", link: "https://www.google.com/search?q=Impact+Hub+Lisbon" },
    { name: "Cowork Lisboa", type: "Coworking", desc: "Located in LX Factory. Creative community, affordable.", crowd: "Freelancers, designers", tip: "Good for long-term members", link: "https://www.google.com/search?q=Cowork+Lisboa+LX+Factory" },
    { name: "WeWork", type: "Coworking", desc: "Multiple locations with premium amenities. Professional networking.", crowd: "Corporate remote workers, startups", tip: "Try the Avenida da Liberdade location", link: "https://www.google.com/search?q=WeWork+Lisbon" },
    { name: "Village Underground", type: "Creative Hub", desc: "Unique space made from shipping containers and buses. Very artistic.", crowd: "Artists, musicians, creatives", tip: "Check their event calendar", link: "https://www.google.com/search?q=Village+Underground+Lisbon" },
  ],
  
  socialEvents: [
    { name: "Lisbon Digital Nomads Meetup", type: "Weekly Meetup", desc: "Regular gatherings for remote workers. Very welcoming community.", crowd: "Digital nomads, expats, travelers", tip: "Check Meetup.com for schedule", link: "https://www.google.com/search?q=Lisbon+Digital+Nomads+Meetup" },
    { name: "Web Summit", type: "Tech Conference", desc: "World's largest tech conference in November. Massive networking opportunity.", crowd: "Tech professionals, entrepreneurs, investors", tip: "Get tickets early, use networking app", link: "https://www.google.com/search?q=Web+Summit+Lisbon" },
    { name: "Lisbon Tech Meetups", type: "Various Meetups", desc: "Python, JavaScript, AI, startup meetups happening weekly.", crowd: "Developers, tech enthusiasts", tip: "Follow Lisbon Tech groups on Meetup", link: "https://www.google.com/search?q=Lisbon+tech+meetups" },
    { name: "Startup Lisboa Events", type: "Startup Events", desc: "Pitch nights, founder dinners, networking sessions.", crowd: "Entrepreneurs, investors", tip: "Join their newsletter", link: "https://www.google.com/search?q=Startup+Lisboa+events" },
    { name: "Lisbon Social Club", type: "Social Group", desc: "Organizes dinners, activities, trips for expats and locals.", crowd: "Expats, internationally-minded locals", tip: "Great for making friends first", link: "https://www.google.com/search?q=Lisbon+Social+Club" },
    { name: "Internations Lisbon", type: "Expat Network", desc: "Premium expat community with regular events.", crowd: "Professionals, established expats", tip: "Membership required but worth it", link: "https://www.google.com/search?q=Internations+Lisbon" },
  ],
  
  activities: [
    { name: "LX Factory", type: "Creative Complex", desc: "Former factory turned creative hub. Shops, restaurants, rooftop bars, bookstores.", crowd: "Creatives, young professionals, tourists", tip: "Sunday market is great for meeting people", link: "https://www.google.com/search?q=LX+Factory+Lisbon" },
    { name: "Timeout Market", type: "Food Hall", desc: "Communal dining with best Lisbon restaurants. Easy to strike conversations.", crowd: "Foodies, tourists, locals", tip: "Sit at communal tables, ask for recommendations", link: "https://www.google.com/search?q=Timeout+Market+Lisbon" },
    { name: "Praça do Príncipe Real", type: "Neighborhood", desc: "Trendy area with brunch spots, boutiques, and gardens. Very expat-friendly.", crowd: "Expats, digital nomads, locals 25-40", tip: "Try Embaixada for shopping and drinks", link: "https://www.google.com/search?q=Praca+Principe+Real+Lisbon" },
    { name: "Feira da Ladra", type: "Flea Market", desc: "Tuesday and Saturday market in Alfama. Great for browsing and chatting.", crowd: "Vintage lovers, locals, tourists", tip: "Go early, bring cash", link: "https://www.google.com/search?q=Feira+da+Ladra+Lisbon" },
    { name: "MAAT", type: "Museum", desc: "Art, architecture, and technology museum by the river. Modern, social.", crowd: "Culture lovers, young professionals", tip: "Thursday evenings are free", link: "https://www.google.com/search?q=MAAT+Lisbon+museum" },
    { name: "Oceanário de Lisboa", type: "Aquarium", desc: "World-class aquarium. Great for casual dates and meeting families.", crowd: "Families, couples, tourists", tip: "Go weekday mornings for fewer crowds", link: "https://www.google.com/search?q=Oceanario+de+Lisboa" },
  ],
  
  sports: [
    { name: "Lisbon Run Club", type: "Running Group", desc: "Regular running meetups across the city. Very social.", crowd: "Fitness enthusiasts, 25-40", tip: "Check Instagram for schedules", link: "https://www.google.com/search?q=Lisbon+Run+Club" },
    { name: "Padel Clubs", type: "Sports", desc: "Padel is huge in Portugal. Many clubs offer social matches.", crowd: "Sporty types, professionals", tip: "Book through Playtomic app", link: "https://www.google.com/search?q=Padel+Lisbon+clubs" },
    { name: "CrossFit Lisbon", type: "Gym", desc: "Multiple CrossFit boxes with strong communities.", crowd: "Fitness enthusiasts, 25-45", tip: "Try a drop-in class", link: "https://www.google.com/search?q=CrossFit+Lisbon" },
    { name: "Surf Schools (Costa da Caparica)", type: "Surfing", desc: "30 min from Lisbon. Great surf community and lessons.", crowd: "Surfers, beach lovers, 20-35", tip: "Weekend surf trips are social", link: "https://www.google.com/search?q=Surf+Costa+Caparica+Lisbon" },
    { name: "Yoga Studios", type: "Wellness", desc: "Many studios offer community classes and events.", crowd: "Wellness-focused, 25-50", tip: "Try Yoga Lisbon or Pure Yoga", link: "https://www.google.com/search?q=Yoga+Lisbon+studios" },
    { name: "Cycling Groups", type: "Cycling", desc: "Groups ride along the river and to beaches.", crowd: "Cyclists, outdoor enthusiasts", tip: "Join Lisbon Cycling Club on Facebook", link: "https://www.google.com/search?q=Cycling+groups+Lisbon" },
  ],
  
  languageExchange: [
    { name: "Tandem Lisbon", type: "Language Exchange", desc: "App-based but organizes in-person meetups.", crowd: "Language learners, expats", tip: "Great for meeting locals who want to practice English", link: "https://www.google.com/search?q=Tandem+Lisbon+language+exchange" },
    { name: "Language Exchange Lisbon Meetup", type: "Weekly Event", desc: "Regular meetups in bars for practicing languages.", crowd: "Multilingual crowd, expats, locals", tip: "Check Meetup.com for locations", link: "https://www.google.com/search?q=Language+Exchange+Lisbon+Meetup" },
    { name: "Portuguese Language Schools", type: "Classes", desc: "Learning Portuguese is a great way to meet people.", crowd: "Expats committed to staying", tip: "Try Portuguese Connection or CIAL", link: "https://www.google.com/search?q=Portuguese+language+school+Lisbon" },
  ],
  
  cultural: [
    { name: "Fado Nights in Alfama", type: "Music", desc: "Traditional Portuguese music in intimate venues. Very romantic.", crowd: "Culture seekers, romantics, 30-50", tip: "Try Clube de Fado or A Baiuca", link: "https://www.google.com/search?q=Fado+Alfama+Lisbon" },
    { name: "Jazz Clubs", type: "Music", desc: "Hot Clube de Portugal and other venues have great jazz.", crowd: "Music lovers, sophisticated crowd", tip: "Check schedule for international acts", link: "https://www.google.com/search?q=Jazz+clubs+Lisbon" },
    { name: "Art Galleries (Chiado)", type: "Art", desc: "Many galleries with openings and events.", crowd: "Art lovers, creatives", tip: "Follow galleries on Instagram for openings", link: "https://www.google.com/search?q=Art+galleries+Chiado+Lisbon" },
    { name: "Book Clubs", type: "Literary", desc: "Several English book clubs meet regularly.", crowd: "Readers, intellectuals", tip: "Check Lisbon Book Club on Facebook", link: "https://www.google.com/search?q=Book+club+Lisbon+English" },
  ],
  
  expatHotspots: [
    { name: "Cascais", type: "Beach Town", desc: "30 min train ride. Large British and international community.", crowd: "Established expats, families, wealthy retirees", tip: "Great for weekend trips and networking", link: "https://www.google.com/search?q=Cascais+expat+community" },
    { name: "Príncipe Real", type: "Neighborhood", desc: "Most expat-friendly neighborhood in Lisbon center.", crowd: "Digital nomads, young expats", tip: "Live here if you want expat community", link: "https://www.google.com/search?q=Principe+Real+Lisbon+expats" },
    { name: "Alfama", type: "Neighborhood", desc: "Traditional but increasingly international. Great Fado scene.", crowd: "Culture-loving expats, artists", tip: "Best for authentic Portuguese experience", link: "https://www.google.com/search?q=Alfama+Lisbon+neighborhood" },
    { name: "Expat Facebook Groups", type: "Online Community", desc: "Lisbon Digital Nomads, Expats in Lisbon, Lisbon Social.", crowd: "All expats and nomads", tip: "Join before arriving to network", link: "https://www.google.com/search?q=Expats+in+Lisbon+Facebook+group" },
  ]
};

const topicSuggestions = [
  { icon: Utensils, title: 'Restaurants for Dates', desc: 'Best spots by price & vibe', query: 'What are the best restaurants in Lisbon for a romantic date?' },
  { icon: MapPin, title: 'Hidden Romantic Spots', desc: 'Secret places locals love', query: 'What are some hidden romantic spots in Lisbon for dates?' },
  { icon: Sparkles, title: 'Unique Date Ideas', desc: 'Memorable experiences', query: 'What are some unique date experiences I can plan in Lisbon?' },
  { icon: Users, title: 'Meeting Singles', desc: 'Best places & events', query: 'Where can I meet single people in Lisbon?' },
  { icon: Smartphone, title: 'Dating Apps Guide', desc: 'Best apps & strategies', query: 'What are the best dating apps in Portugal and how to use them effectively?' },
  { icon: Coffee, title: 'Conversation Tips', desc: 'How to break the ice', query: 'How do I start conversations with people in Lisbon?' },
  { icon: Hotel, title: 'Hotels & Stays', desc: 'Guest-friendly options', query: 'What are the best hotels in Lisbon for bringing guests?' },
  { icon: BookOpen, title: 'Dating Culture', desc: 'Portuguese dating scene', query: 'What should I know about the dating culture in Portugal?' },
  { icon: Heart, title: 'Understanding Locals', desc: 'Tips for Portuguese partners', query: 'What are Portuguese men/women like in relationships?' },
];

const quickQuestions = [
  "Best dating apps in Portugal?",
  "How to succeed on Tinder in Lisbon?",
  "Where do expats hang out?",
  "Dating apps for serious relationships?",
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

function generateDatingAppsResponse(profile: UserProfile): string {
  let response = `📱 **Dating Apps in Portugal - Complete Research Guide**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **TOP RECOMMENDATIONS FOR YOU**

`;
  
  // Personalized recommendations based on profile
  if (profile.age) {
    const ageRec = datingAppsResearch.ageRecommendations[profile.age as keyof typeof datingAppsResearch.ageRecommendations];
    if (ageRec) {
      response += `Based on your age (${profile.age}):\n`;
      response += `• **Primary:** ${ageRec.primary}\n`;
      response += `• **Secondary:** ${ageRec.secondary.join(', ')}\n`;
      response += `• 💡 ${ageRec.tip}\n\n`;
    }
  }
  
  if (profile.orientation) {
    const orientRec = datingAppsResearch.orientationRecommendations[profile.orientation as keyof typeof datingAppsResearch.orientationRecommendations];
    if (orientRec) {
      response += `Based on your orientation (${profile.orientation}):\n`;
      response += `• **Best Apps:** ${orientRec.apps.join(', ')}\n`;
      response += `• 💡 ${orientRec.tip}\n\n`;
    }
  }
  
  if (profile.goals?.toLowerCase().includes('serious') || profile.goals?.toLowerCase().includes('relationship')) {
    response += `For serious relationships:\n`;
    response += `• **Hinge** - Highest success rate for serious dating\n`;
    response += `• **Bumble** - Quality over quantity approach\n`;
    response += `• **Inner Circle** - Curated professional community\n\n`;
  }
  
  if (profile.goals?.toLowerCase().includes('casual') || profile.goals?.toLowerCase().includes('fun')) {
    response += `For casual dating:\n`;
    response += `• **Tinder** - Largest user base, most options\n`;
    response += `• **Badoo** - Popular with locals, less expats\n\n`;
  }
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 **ALL DATING APPS - DETAILED ANALYSIS**

`;
  
  datingAppsResearch.apps.forEach(app => {
    response += `**${app.name}** ${app.popularity !== "Most Popular" ? `(${app.popularity})` : ''}\n`;
    response += `├─ Users in Portugal: ${app.usersInPortugal}\n`;
    response += `├─ Demographics: ${app.demographics}\n`;
    response += `├─ Best For: ${app.bestFor}\n`;
    response += `├─ Effectiveness: ${app.effectiveness}\n`;
    response += `├─ Cost: ${app.cost}\n`;
    response += `├─ Success Rate: ${app.successRate}\n`;
    response += `├─ 💡 Local Insight: ${app.localInsight}\n`;
    response += `└─ [Search on Google →]\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 **SUCCESS STRATEGIES**

`;
  
  datingAppsResearch.strategyTips.forEach((strategy, i) => {
    response += `${i + 1}. **${strategy.title}** (${strategy.effectiveness} effectiveness)\n`;
    response += `   ${strategy.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🇵🇹 **CULTURAL NOTES FOR APP DATING**

`;
  
  datingAppsResearch.culturalNotes.forEach(note => {
    response += `• ${note}\n`;
  });
  
  response += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌍 **EXPAT VS LOCAL APPS**

`;
  response += `**For dating expats:** ${datingAppsResearch.expatVsLocal.expatApps.join(', ')}\n`;
  response += `**For dating locals:** ${datingAppsResearch.expatVsLocal.localApps.join(', ')}\n`;
  response += `**For both:** ${datingAppsResearch.expatVsLocal.mixedApps.join(', ')}\n`;
  response += `\n💡 ${datingAppsResearch.expatVsLocal.tip}\n`;
  
  response += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **PRO TIP:** Use 2-3 apps simultaneously. Tinder for volume/options, Bumble or Hinge for quality. Different apps attract different crowds in Lisbon. Portuguese often use multiple apps too!`;
  
  return response;
}

function generateResponse(query: string, profile: UserProfile): string {
  const q = query.toLowerCase();
  
  // Dating apps queries
  if (q.includes('dating app') || q.includes('tinder') || q.includes('bumble') || q.includes('hinge') || q.includes('grindr') || q.includes('app') && q.includes('dating') || q.includes('best app') || q.includes('online dating')) {
    return generateDatingAppsResponse(profile);
  }
  
  if (q.includes('succeed') && q.includes('tinder')) {
    return `📱 **How to Succeed on Tinder in Lisbon:**

**Profile Optimization:**
• Include a photo in Lisbon/Portugal - shows you're actually here
• Write bio in English with a Portuguese phrase (shows effort)
• Mention you're a digital nomad - attracts like-minded people
• Be clear about intentions in bio - Portuguese appreciate honesty

**Timing Strategy:**
• Best swipe times: 8-11pm weekdays
• Weekend peaks: Friday-Saturday all day
• Sunday evening surprisingly active (after family time)

**Matching Strategy:**
• Like profiles with genuine bios (not just photos)
• Portuguese often state intentions - read carefully
• Expats vs locals: decide your target and adjust approach

**First Message:**
• Reference something specific in their profile
• Ask about their favorite Lisbon spot
• Suggest meeting relatively quickly (3-5 messages)

**Moving to Date:**
• Portuguese prefer meeting in person vs long texting
• Suggest coffee, drink, or specific activity
• Thursday is prime for weekend date planning

**Success Rate:** 60-70% match-to-date conversion if active and strategic.

💡 **Pro tip:** Tinder in Lisbon is the default app. Volume is high but quality varies. Combine with Bumble/Hinge for better results.`;
  }
  
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
  
  if (q.includes('meet') || q.includes('single') || q.includes('where') || q.includes('people')) {
    return generateMeetingPlacesResponse(profile);
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

• 📱 Dating apps guide (best apps & strategies)
• 🍽️ Restaurant recommendations for dates
• 🌅 Romantic spots and viewpoints
• 👥 Where to meet singles
• 💬 Conversation tips
• 🏨 Hotel recommendations
• 🇵🇹 Cultural insights about dating
• 👨👩 Understanding Portuguese men/women

What would you like to know more about?`;
}

function generateMeetingPlacesResponse(profile: UserProfile): string {
  let response = `👥 **Where to Meet People in Lisbon - Complete Guide**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌙 **NIGHTLIFE & BARS**

`;
  
  meetingPlaces.nightlife.slice(0, 5).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 **COWORKING SPACES** (Perfect for digital nomads!)

`;
  
  meetingPlaces.coworking.slice(0, 4).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 **SOCIAL EVENTS & MEETUPS**

`;
  
  meetingPlaces.socialEvents.slice(0, 4).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **ACTIVITIES & SOCIAL HOTSPOTS**

`;
  
  meetingPlaces.activities.slice(0, 4).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏃 **SPORTS & FITNESS**

`;
  
  meetingPlaces.sports.slice(0, 4).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗣️ **LANGUAGE EXCHANGE**

`;
  
  meetingPlaces.languageExchange.forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 **CULTURAL EVENTS**

`;
  
  meetingPlaces.cultural.slice(0, 3).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌍 **EXPAT HOTSPOTS**

`;
  
  meetingPlaces.expatHotspots.slice(0, 3).forEach(place => {
    response += `• **${place.name}** (${place.type})\n  ${place.desc}\n  Crowd: ${place.crowd}\n  💡 ${place.tip}\n\n`;
  });
  
  // Add personalized recommendations
  if (profile.goals || profile.interestedIn || profile.age) {
    response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **PERSONALIZED FOR YOU**

`;
    
    if (profile.age === '18-25' || profile.age === '26-35') {
      response += `Based on your age, I recommend: **Lux Frágil**, **Bairro Alto**, and **LX Factory** - these have the youngest, most dynamic crowds.\n\n`;
    }
    if (profile.age === '36-45' || profile.age === '46+') {
      response += `Based on your age, I recommend: **Pensão Amor**, **Topo Chiado**, and **Internations events** - more sophisticated crowds.\n\n`;
    }
    
    if (profile.goals?.toLowerCase().includes('serious') || profile.goals?.toLowerCase().includes('relationship')) {
      response += `For serious relationships: Focus on **coworking spaces**, **language exchanges**, and **sports groups** - you'll meet people with similar lifestyles and intentions.\n\n`;
    }
    if (profile.goals?.toLowerCase().includes('casual') || profile.goals?.toLowerCase().includes('fun')) {
      response += `For casual dating: **Bairro Alto nightlife**, **Lux Frágil**, and **Timeout Market** are great for spontaneous connections.\n\n`;
    }
    
    if (profile.orientation === 'gay') {
      response += `🌈 **LGBTQ+ Specific:** Príncipe Real neighborhood has several gay-friendly bars. **Finalmente Club** is a legendary drag bar. Check **Lisbon Gay Meetup** groups on Facebook.\n\n`;
    }
  }
  
  response += `💡 **Pro tip:** The best strategy is to become a "regular" somewhere - a café, coworking space, or gym. Portuguese appreciate familiarity and you'll naturally meet people over time.`;
  
  return response;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showProfile, setShowProfile] = useState(true);
  const [showMeetingGuide, setShowMeetingGuide] = useState(false);
  const [showDatingAppsGuide, setShowDatingAppsGuide] = useState(false);
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
• 📱 Dating apps guide (best apps & strategies)
• 🍽️ Restaurants for dates
• 🌅 Romantic spots
• 👥 Where to meet singles
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

  const openGoogleSearch = (name: string) => {
    const query = encodeURIComponent(`${name} Lisbon Portugal`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    nightlife: PartyPopper,
    coworking: Laptop,
    socialEvents: Calendar,
    activities: Sparkles,
    sports: Dumbbell,
    languageExchange: Languages,
    cultural: Palette,
    expatHotspots: Globe,
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
              <>
                <button
                  onClick={() => setShowDatingAppsGuide(true)}
                  className="px-3 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Dating Apps
                </button>
                <button
                  onClick={() => setShowMeetingGuide(true)}
                  className="px-3 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--border)] transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Meeting Guide
                </button>
                <button
                  onClick={() => setShowProfile(true)}
                  className="p-2 rounded-xl hover:bg-[var(--border)] transition-colors"
                  aria-label="Edit profile"
                >
                  <User className="w-5 h-5" />
                </button>
              </>
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

        {/* Dating Apps Guide Modal */}
        {showDatingAppsGuide && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="glass rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Dating Apps in Portugal</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">Complete research guide with strategies</p>
                </div>
                <button
                  onClick={() => setShowDatingAppsGuide(false)}
                  className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Personalized Recommendations */}
              {(profile.age || profile.orientation || profile.goals) && (
                <div className="mb-6 p-4 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="font-semibold">Personalized for You</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    {profile.age && datingAppsResearch.ageRecommendations[profile.age as keyof typeof datingAppsResearch.ageRecommendations] && (
                      <p>
                        <strong>Age {profile.age}:</strong> Primary: {datingAppsResearch.ageRecommendations[profile.age as keyof typeof datingAppsResearch.ageRecommendations].primary}
                        | Secondary: {datingAppsResearch.ageRecommendations[profile.age as keyof typeof datingAppsResearch.ageRecommendations].secondary.join(', ')}
                      </p>
                    )}
                    {profile.orientation && datingAppsResearch.orientationRecommendations[profile.orientation as keyof typeof datingAppsResearch.orientationRecommendations] && (
                      <p>
                        <strong>{profile.orientation.charAt(0).toUpperCase() + profile.orientation.slice(1)}:</strong> {datingAppsResearch.orientationRecommendations[profile.orientation as keyof typeof datingAppsResearch.orientationRecommendations].apps.join(', ')}
                      </p>
                    )}
                    {profile.goals?.toLowerCase().includes('serious') && (
                      <p><strong>For serious relationships:</strong> Hinge (highest success), Bumble (quality), Inner Circle (professionals)</p>
                    )}
                    {profile.goals?.toLowerCase().includes('casual') && (
                      <p><strong>For casual dating:</strong> Tinder (largest base), Badoo (local Portuguese)</p>
                    )}
                  </div>
                </div>
              )}

              {/* Apps Grid */}
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="font-semibold">All Dating Apps - Detailed Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {datingAppsResearch.apps.map((app, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm">{app.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          app.popularity === 'Most Popular' ? 'bg-green-100 text-green-700' :
                          app.popularity === 'Fast Growing' ? 'bg-blue-100 text-blue-700' :
                          app.popularity === 'Essential for Gay Men' || app.popularity === 'Leading for LGBTQ+ Women' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{app.popularity}</span>
                      </div>
                      <p className="text-xs text-[var(--muted)] mb-2">{app.usersInPortugal}</p>
                      <p className="text-xs mb-1"><span className="font-medium">Best for:</span> {app.bestFor}</p>
                      <p className="text-xs mb-1"><span className="font-medium">Effectiveness:</span> {app.effectiveness}</p>
                      <p className="text-xs mb-2"><span className="font-medium">Cost:</span> {app.cost}</p>
                      <p className="text-xs text-[var(--accent)] mb-2">💡 {app.localInsight}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs"><TrendingUp className="w-3 h-3 inline mr-1" />{app.successRate}</span>
                        <button
                          onClick={() => openGoogleSearch(app.name + ' dating app Portugal')}
                          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[var(--accent)]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Search
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Tips */}
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="font-semibold">Success Strategies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {datingAppsResearch.strategyTips.map((strategy, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[var(--border)]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">{strategy.effectiveness}</span>
                        <h4 className="font-medium text-sm">{strategy.title}</h4>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{strategy.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Notes */}
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="font-semibold">Cultural Notes for App Dating</h3>
                </div>
                <div className="p-4 rounded-xl bg-[var(--border)]">
                  <ul className="space-y-1 text-sm">
                    {datingAppsResearch.culturalNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expat vs Local */}
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="font-semibold">Expat vs Local Apps</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--border)]">
                    <h4 className="font-medium text-sm mb-2">For Expats</h4>
                    <p className="text-xs">{datingAppsResearch.expatVsLocal.expatApps.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--border)]">
                    <h4 className="font-medium text-sm mb-2">For Locals</h4>
                    <p className="text-xs">{datingAppsResearch.expatVsLocal.localApps.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--border)]">
                    <h4 className="font-medium text-sm mb-2">For Both</h4>
                    <p className="text-xs">{datingAppsResearch.expatVsLocal.mixedApps.join(', ')}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] mt-2">💡 {datingAppsResearch.expatVsLocal.tip}</p>
              </div>

              {/* Pro Tip */}
              <div className="text-center p-4 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20">
                <p className="text-sm">
                  <Award className="w-4 h-4 inline mr-1 text-[var(--accent)]" />
                  <strong>Pro tip:</strong> Use 2-3 apps simultaneously. Tinder for volume/options, Bumble or Hinge for quality. Different apps attract different crowds in Lisbon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Meeting Guide Modal */}
        {showMeetingGuide && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="glass rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Where to Meet People in Lisbon</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">Complete guide for digital nomads</p>
                </div>
                <button
                  onClick={() => setShowMeetingGuide(false)}
                  className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Sections */}
              <div className="space-y-6">
                {Object.entries(meetingPlaces).map(([category, places], catIndex) => {
                  const Icon = categoryIcons[category] || Users;
                  const categoryNames: Record<string, string> = {
                    nightlife: '🌙 Nightlife & Bars',
                    coworking: '💼 Coworking Spaces',
                    socialEvents: '📅 Social Events & Meetups',
                    activities: '🎯 Activities & Hotspots',
                    sports: '🏃 Sports & Fitness',
                    languageExchange: '🗣️ Language Exchange',
                    cultural: '🎨 Cultural Events',
                    expatHotspots: '🌍 Expat Hotspots',
                  };
                  
                  return (
                    <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-5 h-5 text-[var(--accent)]" />
                        <h3 className="font-semibold">{categoryNames[category] || category}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {places.map((place, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-medium text-sm">{place.name}</h4>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--border)]">{place.type}</span>
                            </div>
                            <p className="text-xs text-[var(--muted)] mb-2">{place.desc}</p>
                            <p className="text-xs mb-2"><span className="font-medium">Crowd:</span> {place.crowd}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-[var(--accent)]">💡 {place.tip}</p>
                              <button
                                onClick={() => openGoogleSearch(place.name)}
                                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[var(--accent)]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Search
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Personalized Tips */}
                {(profile.age || profile.goals || profile.orientation === 'gay') && (
                  <div className="animate-fade-in-up p-4 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-[var(--accent)]" />
                      <h3 className="font-semibold">🎯 Personalized for You</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      {profile.age === '18-25' || profile.age === '26-35' ? (
                        <p>• Based on your age: <strong>Lux Frágil</strong>, <strong>Bairro Alto</strong>, and <strong>LX Factory</strong> have the youngest, most dynamic crowds.</p>
                      ) : null}
                      {profile.age === '36-45' || profile.age === '46+' ? (
                        <p>• Based on your age: <strong>Pensão Amor</strong>, <strong>Topo Chiado</strong>, and <strong>Internations events</strong> have more sophisticated crowds.</p>
                      ) : null}
                      {profile.goals?.toLowerCase().includes('serious') || profile.goals?.toLowerCase().includes('relationship') ? (
                        <p>• For serious relationships: Focus on <strong>coworking spaces</strong>, <strong>language exchanges</strong>, and <strong>sports groups</strong>.</p>
                      ) : null}
                      {profile.goals?.toLowerCase().includes('casual') || profile.goals?.toLowerCase().includes('fun') ? (
                        <p>• For casual dating: <strong>Bairro Alto nightlife</strong>, <strong>Lux Frágil</strong>, and <strong>Timeout Market</strong> are great.</p>
                      ) : null}
                      {profile.orientation === 'gay' ? (
                        <p>• 🌈 LGBTQ+: <strong>Príncipe Real</strong> neighborhood has gay-friendly bars. <strong>Finalmente Club</strong> is legendary. Check Lisbon Gay Meetup groups.</p>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Pro Tip */}
                <div className="text-center p-4 rounded-xl bg-[var(--border)]">
                  <p className="text-sm text-[var(--muted)]">
                    💡 <strong>Pro tip:</strong> The best strategy is to become a "regular" somewhere - a café, coworking space, or gym. Portuguese appreciate familiarity and you'll naturally meet people over time.
                  </p>
                </div>
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
