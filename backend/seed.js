require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Article = require("./models/Article");
const Category = require("./models/Category");

const categoriesData = [
  { id: "sports", label: "Sports", slug: "sports" },
  { id: "health", label: "Health", slug: "health" },
  { id: "technology", label: "Technology", slug: "technology" },
  { id: "asia", label: "Asia", slug: "asia" },
  { id: "europe", label: "Europe", slug: "europe" },
  { id: "africa", label: "Africa", slug: "africa" },
  { id: "australia", label: "Australia", slug: "australia" },
  { id: "north-america", label: "North America", slug: "north-america" },
  { id: "south-america", label: "South America", slug: "south-america" },
  { id: "antarctica", label: "Antarctica", slug: "antarctica" },
  { id: "business", label: "Business", slug: "business" },
  { id: "science", label: "Science", slug: "science" },
  { id: "entertainment", label: "Entertainment", slug: "entertainment" },
  { id: "lifestyle", label: "Lifestyle", slug: "lifestyle" },
  { id: "travel", label: "Travel", slug: "travel" },
  { id: "food", label: "Food", slug: "food" },
  { id: "art", label: "Art", slug: "art" },
  { id: "education", label: "Education", slug: "education" },
];

const articlesData = [
  {
    slug: "ai-tools-transform-small-businesses",
    title: "AI Tools Transform How Small Businesses Work",
    category: "technology",
    author: "Maya Thompson",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
    featured: true,
    breaking: true,
    media: "standard",
    excerpt: "Discover how artificial intelligence is reshaping the way small businesses operate, from customer service to marketing automation.",
    content: "Artificial intelligence is no longer the exclusive domain of tech giants. Small businesses across the globe are adopting AI-powered tools to streamline operations, enhance customer experiences, and drive growth. From chatbots handling customer inquiries to predictive analytics guiding inventory decisions, the AI revolution is democratizing efficiency.",
    body: [
      "Artificial intelligence is no longer the exclusive domain of tech giants. Small businesses across the globe are adopting AI-powered tools to streamline operations, enhance customer experiences, and drive growth.",
      "From chatbots handling customer inquiries to predictive analytics guiding inventory decisions, the AI revolution is democratizing efficiency.",
      "Industry analysts predict that by 2028, over 70% of small businesses will use at least one AI tool in their daily operations."
    ],
    tags: ["Technology", "AI", "Business"],
    readTime: "5 min read",
    comments: 42,
    views: 12500,
  },
  {
    slug: "rising-stars-landmark-season",
    title: "Rising Stars Set the Pace for a Landmark Season",
    category: "sports",
    author: "Daniel Reed",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80",
    featured: true,
    media: "standard",
    excerpt: "A new generation of athletes is redefining performance records and capturing the attention of fans worldwide.",
    content: "The current sports season has been nothing short of extraordinary. Young athletes from diverse backgrounds are breaking long-standing records and bringing fresh energy to competition. Their dedication and innovative training methods are setting new benchmarks across multiple disciplines.",
    body: [
      "The current sports season has been nothing short of extraordinary. Young athletes from diverse backgrounds are breaking long-standing records and bringing fresh energy to competition.",
      "Their dedication and innovative training methods are setting new benchmarks across multiple disciplines.",
      "Scouts and coaches are paying close attention to these emerging talents who could shape the future of professional sports."
    ],
    tags: ["Sports", "Athletes", "Records"],
    readTime: "4 min read",
    comments: 35,
    views: 9800,
  },
  {
    slug: "everyday-habits-better-sleep",
    title: "The Everyday Habits Supporting Better Sleep",
    category: "health",
    author: "Priya Shah",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
    featured: true,
    media: "standard",
    excerpt: "Experts reveal the simple lifestyle adjustments that can dramatically improve your sleep quality and overall wellbeing.",
    content: "Sleep researchers have identified key habits that make a measurable difference in sleep quality. Consistent wake times, limiting screen exposure before bed, and maintaining a cool bedroom environment are among the most impactful changes. These adjustments, though simple, can transform how rested and productive you feel each day.",
    body: [
      "Sleep researchers have identified key habits that make a measurable difference in sleep quality.",
      "Consistent wake times, limiting screen exposure before bed, and maintaining a cool bedroom environment are among the most impactful changes.",
      "These adjustments, though simple, can transform how rested and productive you feel each day."
    ],
    tags: ["Health", "Sleep", "Wellness"],
    readTime: "3 min read",
    comments: 28,
    views: 8300,
  },
  {
    slug: "new-generation-founders-long-term",
    title: "A New Generation of Founders Builds for the Long Term",
    category: "business",
    author: "Elena Brooks",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
    media: "standard",
    excerpt: "Startup founders are shifting focus from rapid growth to sustainable business models that prioritize long-term value.",
    content: "The startup landscape is undergoing a fundamental shift. Founders today are increasingly prioritizing sustainable growth over hypergrowth strategies. This new wave of entrepreneurs is building companies designed to last, focusing on profitability, employee wellbeing, and positive social impact.",
    body: [
      "The startup landscape is undergoing a fundamental shift. Founders today are increasingly prioritizing sustainable growth over hypergrowth strategies.",
      "This new wave of entrepreneurs is building companies designed to last, focusing on profitability, employee wellbeing, and positive social impact.",
      "Investors are taking notice, with venture capital flowing toward businesses that demonstrate clear paths to profitability."
    ],
    tags: ["Business", "Startups", "Entrepreneurship"],
    readTime: "6 min read",
    comments: 19,
    views: 7600,
  },
  {
    slug: "ocean-research-new-discoveries",
    title: "Ocean Research Brings New Discoveries to Light",
    category: "science",
    author: "Leo Grant",
    image: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=600&q=80",
    media: "standard",
    excerpt: "Marine scientists are uncovering previously unknown species and ecosystems in the deepest parts of the ocean.",
    content: "Deep-sea exploration missions have revealed remarkable new findings, including species never before documented by science. These discoveries are expanding our understanding of marine biodiversity and highlighting the importance of ocean conservation efforts.",
    body: [
      "Deep-sea exploration missions have revealed remarkable new findings, including species never before documented by science.",
      "These discoveries are expanding our understanding of marine biodiversity and highlighting the importance of ocean conservation efforts.",
      "Researchers emphasize that protecting ocean ecosystems is crucial for maintaining the planet's overall ecological balance."
    ],
    tags: ["Science", "Ocean", "Discovery"],
    readTime: "4 min read",
    comments: 22,
    views: 6400,
  },
  {
    slug: "cities-greener-streets-cleaner-air",
    title: "Cities Invest in Greener Streets and Cleaner Air",
    category: "asia",
    author: "Sofia Martinez",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    media: "standard",
    excerpt: "Urban planners across Asia are redesigning city spaces with sustainability and public health at the forefront.",
    content: "Major Asian cities are investing heavily in green infrastructure. From urban forests to pedestrian-only zones, these initiatives aim to improve air quality and create more livable urban environments. The trend reflects a growing recognition that sustainability and quality of life go hand in hand.",
    body: [
      "Major Asian cities are investing heavily in green infrastructure. From urban forests to pedestrian-only zones, these initiatives aim to improve air quality and create more livable urban environments.",
      "The trend reflects a growing recognition that sustainability and quality of life go hand in hand.",
      "Citizens are actively participating in community gardens and green initiatives, fostering a sense of shared responsibility."
    ],
    tags: ["Asia", "Environment", "Cities"],
    readTime: "5 min read",
    comments: 15,
    views: 5900,
  },
  {
    slug: "startups-grow-responsibly",
    title: "Local Startups Find New Ways to Grow Responsibly",
    category: "europe",
    author: "Aaron Cole",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    media: "standard",
    excerpt: "European startups are pioneering sustainable growth strategies that balance profit with purpose.",
    content: "Across Europe, a new breed of startups is emerging that places equal importance on financial returns and social responsibility. These companies are proving that ethical business practices and profitability can coexist, attracting both impact-focused investors and conscious consumers.",
    body: [
      "Across Europe, a new breed of startups is emerging that places equal importance on financial returns and social responsibility.",
      "These companies are proving that ethical business practices and profitability can coexist, attracting both impact-focused investors and conscious consumers.",
      "Government policies in several European countries are supporting this trend with incentives for sustainable businesses."
    ],
    tags: ["Europe", "Business", "Sustainability"],
    readTime: "5 min read",
    comments: 11,
    views: 4700,
  },
  {
    slug: "creative-hubs-connecting-africa",
    title: "Creative Hubs Are Connecting Communities Across Africa",
    category: "africa",
    author: "Amara Okafor",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80",
    media: "standard",
    excerpt: "Innovation centers across Africa are fostering collaboration, creativity, and economic opportunity.",
    content: "Creative hubs are springing up across the African continent, serving as catalysts for innovation and community building. These spaces bring together artists, entrepreneurs, and technologists to collaborate on projects that address local challenges while contributing to the global creative economy.",
    body: [
      "Creative hubs are springing up across the African continent, serving as catalysts for innovation and community building.",
      "These spaces bring together artists, entrepreneurs, and technologists to collaborate on projects that address local challenges while contributing to the global creative economy.",
      "Funding and mentorship programs are helping these hubs scale their impact across multiple regions."
    ],
    tags: ["Africa", "Innovation", "Community"],
    readTime: "5 min read",
    comments: 17,
    views: 3800,
  },
  {
    slug: "cities-shaping-tomorrow",
    title: "A Fresh Look at the Cities Shaping Tomorrow",
    category: "asia",
    author: "Kenji Sato",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80",
    media: "standard",
    excerpt: "Smart city initiatives across Asia are transforming urban living with technology-driven solutions.",
    content: "From intelligent transportation systems to AI-powered public services, Asian cities are at the forefront of urban innovation. These smart city projects are improving efficiency, reducing environmental impact, and enhancing the quality of life for millions of residents.",
    body: [
      "From intelligent transportation systems to AI-powered public services, Asian cities are at the forefront of urban innovation.",
      "These smart city projects are improving efficiency, reducing environmental impact, and enhancing the quality of life for millions of residents.",
      "Experts predict that by 2030, over 60% of the world's population will live in smart cities."
    ],
    tags: ["Asia", "Smart Cities", "Technology"],
    readTime: "5 min read",
    comments: 13,
    views: 5200,
  },
  {
    slug: "historic-neighbourhoods-revival",
    title: "The Quiet Revival of Historic Neighbourhoods",
    category: "europe",
    author: "Clara Bennett",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    media: "standard",
    excerpt: "Across Europe, historic districts are being revitalized with a blend of preservation and modern design.",
    content: "Historic neighbourhoods across European cities are experiencing a renaissance. Rather than demolishing old structures, developers and city planners are finding innovative ways to preserve architectural heritage while introducing modern amenities. This approach maintains cultural identity while meeting contemporary needs.",
    body: [
      "Historic neighbourhoods across European cities are experiencing a renaissance.",
      "Rather than demolishing old structures, developers and city planners are finding innovative ways to preserve architectural heritage while introducing modern amenities.",
      "This approach maintains cultural identity while meeting contemporary needs."
    ],
    tags: ["Europe", "Architecture", "Culture"],
    readTime: "4 min read",
    comments: 9,
    views: 4100,
  },
  {
    slug: "space-telescope-changing-universe",
    title: "Space Telescope Images Reveal a Changing Universe",
    category: "science",
    author: "Olivia Chen",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    media: "standard",
    excerpt: "New deep-space imagery is challenging existing theories about how galaxies form and evolve.",
    content: "The latest images from advanced space telescopes are providing unprecedented views of distant galaxies and cosmic phenomena. These observations are prompting scientists to reconsider fundamental theories about the formation and evolution of the universe.",
    body: [
      "The latest images from advanced space telescopes are providing unprecedented views of distant galaxies and cosmic phenomena.",
      "These observations are prompting scientists to reconsider fundamental theories about the formation and evolution of the universe.",
      "The data collected is expected to fuel scientific research for decades to come."
    ],
    tags: ["Science", "Space", "Discovery"],
    readTime: "5 min read",
    comments: 25,
    views: 7200,
  },
  {
    slug: "independent-creators-festival-scene",
    title: "Independent Creators Redefine the Festival Scene",
    category: "entertainment",
    author: "Noah Williams",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&q=80",
    media: "standard",
    excerpt: "DIY festivals and independent events are reshaping the cultural landscape with fresh experiences.",
    content: "Independent creators are taking over the festival scene with innovative, community-driven events. These gatherings prioritize authentic experiences over commercial spectacle, attracting audiences seeking meaningful cultural engagement and creative expression.",
    body: [
      "Independent creators are taking over the festival scene with innovative, community-driven events.",
      "These gatherings prioritize authentic experiences over commercial spectacle, attracting audiences seeking meaningful cultural engagement and creative expression.",
      "Social media has played a crucial role in helping these independent events find their audiences."
    ],
    tags: ["Entertainment", "Festivals", "Culture"],
    readTime: "5 min read",
    comments: 20,
    views: 4500,
  },
  {
    slug: "local-food-markets-worth-traveling",
    title: "The Local Food Markets Worth Planning a Trip Around",
    category: "food",
    author: "Isabelle Ford",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
    media: "standard",
    excerpt: "From Bangkok to Barcelona, these food markets offer unforgettable culinary experiences.",
    content: "Food markets around the world are becoming destinations in their own right. These vibrant spaces bring together local producers, chefs, and food lovers, offering authentic tastes and cultural experiences that go far beyond what any restaurant can provide.",
    body: [
      "Food markets around the world are becoming destinations in their own right.",
      "These vibrant spaces bring together local producers, chefs, and food lovers, offering authentic tastes and cultural experiences that go far beyond what any restaurant can provide.",
      "Travel experts recommend visiting during local festival seasons for the most immersive experience."
    ],
    tags: ["Food", "Travel", "Culture"],
    readTime: "5 min read",
    comments: 31,
    views: 6800,
  },
  {
    slug: "slow-travel-changing-world",
    title: "Slow Travel Is Changing the Way We See the World",
    category: "travel",
    author: "Marcus Lee",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80",
    media: "standard",
    excerpt: "More travelers are choosing immersive, longer stays over quick tourist visits.",
    content: "The slow travel movement is gaining momentum as travelers seek deeper connections with the places they visit. By spending more time in fewer destinations, travelers are discovering hidden gems, building meaningful relationships with locals, and reducing their environmental footprint.",
    body: [
      "The slow travel movement is gaining momentum as travelers seek deeper connections with the places they visit.",
      "By spending more time in fewer destinations, travelers are discovering hidden gems, building meaningful relationships with locals, and reducing their environmental footprint.",
      "This approach to travel is also supporting local economies more effectively than traditional tourism."
    ],
    tags: ["Travel", "Sustainability", "Culture"],
    readTime: "6 min read",
    comments: 16,
    views: 5100,
  },
  {
    slug: "public-art-street-galleries",
    title: "Public Art Projects Turn Streets into Shared Galleries",
    category: "art",
    author: "Harper Stone",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    media: "standard",
    excerpt: "Urban art installations are making creativity accessible to everyone, transforming city spaces.",
    content: "Cities worldwide are embracing public art as a tool for urban renewal and community engagement. Murals, sculptures, and interactive installations are turning ordinary streets into open-air galleries, making art accessible to people from all walks of life.",
    body: [
      "Cities worldwide are embracing public art as a tool for urban renewal and community engagement.",
      "Murals, sculptures, and interactive installations are turning ordinary streets into open-air galleries, making art accessible to people from all walks of life.",
      "Community involvement in the creation process is fostering a sense of ownership and pride among residents."
    ],
    tags: ["Art", "Cities", "Culture"],
    readTime: "4 min read",
    comments: 14,
    views: 3900,
  },
  {
    slug: "human-side-ai-revolution",
    title: "The Human Side of the AI Revolution",
    category: "technology",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    featured: true,
    media: "standard",
    excerpt: "Beyond the algorithms, AI is profoundly changing how people work, create, and connect.",
    content: "While discussions about AI often focus on technical capabilities, the human impact is equally significant. Workers are adapting to new roles, creative professionals are finding AI-assisted tools that enhance their craft, and communities are grappling with the ethical implications of intelligent machines.",
    body: [
      "While discussions about AI often focus on technical capabilities, the human impact is equally significant.",
      "Workers are adapting to new roles, creative professionals are finding AI-assisted tools that enhance their craft, and communities are grappling with the ethical implications of intelligent machines.",
      "Experts emphasize the importance of human-centered AI development that prioritizes people over profits."
    ],
    tags: ["Technology", "AI", "Society"],
    readTime: "7 min read",
    comments: 52,
    views: 15200,
  },
  {
    slug: "practical-guide-everyday-wellbeing",
    title: "A Practical Guide to Everyday Wellbeing",
    category: "health",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80",
    featured: true,
    media: "standard",
    excerpt: "Simple, science-backed strategies for improving your physical and mental health every day.",
    content: "Wellbeing doesn't require drastic changes. Small, consistent habits like regular movement, mindful eating, and quality social connections can have a profound impact on your overall health. This guide covers practical steps anyone can take starting today.",
    body: [
      "Wellbeing doesn't require drastic changes. Small, consistent habits like regular movement, mindful eating, and quality social connections can have a profound impact on your overall health.",
      "This guide covers practical steps anyone can take starting today.",
      "Mental health professionals recommend starting with just one change per week for sustainable improvement."
    ],
    tags: ["Health", "Wellness", "Lifestyle"],
    readTime: "5 min read",
    comments: 38,
    views: 9400,
  },
  {
    slug: "great-teams-stay-great",
    title: "What Makes Great Teams Stay Great",
    category: "sports",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    media: "standard",
    excerpt: "Team dynamics, leadership, and culture are the secrets behind sustained competitive success.",
    content: "The most successful sports teams share common traits beyond talent: strong leadership, clear communication, and a culture of mutual respect. Understanding these dynamics offers lessons applicable far beyond the playing field.",
    body: [
      "The most successful sports teams share common traits beyond talent: strong leadership, clear communication, and a culture of mutual respect.",
      "Understanding these dynamics offers lessons applicable far beyond the playing field.",
      "Coaches and managers are increasingly investing in team-building programs and mental health support."
    ],
    tags: ["Sports", "Leadership", "Teamwork"],
    readTime: "5 min read",
    comments: 18,
    views: 4800,
  },
  {
    slug: "climate-solutions-cities",
    title: "The Climate Solutions Taking Root in Cities",
    category: "science",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    media: "standard",
    excerpt: "Urban areas are becoming testing grounds for innovative approaches to combat climate change.",
    content: "Cities around the world are implementing creative solutions to address climate challenges. From green rooftops to electric public transportation, these urban initiatives are demonstrating that meaningful climate action is possible even in densely populated areas.",
    body: [
      "Cities around the world are implementing creative solutions to address climate challenges.",
      "From green rooftops to electric public transportation, these urban initiatives are demonstrating that meaningful climate action is possible even in densely populated areas.",
      "Collaboration between government, businesses, and citizens is key to scaling these solutions."
    ],
    tags: ["Science", "Climate", "Cities"],
    readTime: "5 min read",
    comments: 24,
    views: 6100,
  },
  {
    slug: "antarctic-research-station-expansion",
    title: "New Antarctic Research Station Expands Climate Monitoring",
    category: "antarctica",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
    media: "standard",
    excerpt: "An international consortium has opened a state-of-the-art research facility in Antarctica.",
    content: "A new state-of-the-art research station in Antarctica has begun operations, significantly expanding the world's capacity to monitor climate change. The facility, built through international collaboration, will house scientists from 15 countries and is equipped with cutting-edge monitoring equipment.",
    body: [
      "A new state-of-the-art research station in Antarctica has begun operations, significantly expanding the world's capacity to monitor climate change.",
      "The facility, built through international collaboration, will house scientists from 15 countries and is equipped with cutting-edge monitoring equipment.",
      "Early data from the station is already providing valuable insights into polar ice dynamics and their global implications."
    ],
    tags: ["Antarctica", "Science", "Climate"],
    readTime: "6 min read",
    comments: 12,
    views: 3200,
  },
  {
    slug: "australia-wildfire-recovery-ecosystems",
    title: "Australia's Ecosystem Recovery After Wildfire Season",
    category: "australia",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",
    media: "standard",
    excerpt: "Remarkable signs of regeneration are appearing across previously fire-affected landscapes.",
    content: "Wildlife researchers in Australia are documenting encouraging signs of ecosystem recovery following the devastating wildfire season. Native species are returning to affected areas, and new plant growth is emerging from soil enriched by the natural cycle of fire and renewal.",
    body: [
      "Wildlife researchers in Australia are documenting encouraging signs of ecosystem recovery following the devastating wildfire season.",
      "Native species are returning to affected areas, and new plant growth is emerging from soil enriched by the natural cycle of fire and renewal.",
      "Conservationists emphasize that long-term monitoring and habitat protection remain essential for full recovery."
    ],
    tags: ["Australia", "Environment", "Wildlife"],
    readTime: "5 min read",
    comments: 16,
    views: 4300,
  },
  {
    slug: "latin-american-tech-boom",
    title: "Latin America's Tech Scene Sees Record Investment",
    category: "south-america",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
    media: "standard",
    excerpt: "Fintech and edtech startups across South America are attracting unprecedented venture capital.",
    content: "Latin America's technology sector is experiencing a surge in investment, with fintech and edtech companies leading the charge. The region's unique challenges have inspired innovative solutions that are now gaining global recognition and attracting international investors.",
    body: [
      "Latin America's technology sector is experiencing a surge in investment, with fintech and edtech companies leading the charge.",
      "The region's unique challenges have inspired innovative solutions that are now gaining global recognition and attracting international investors.",
      "Government support and improved digital infrastructure are creating a more favorable environment for tech entrepreneurship."
    ],
    tags: ["South America", "Technology", "Business"],
    readTime: "5 min read",
    comments: 10,
    views: 3600,
  },
  {
    slug: "north-america-renewable-energy-milestone",
    title: "North America Hits Major Renewable Energy Milestone",
    category: "north-america",
    author: "Staff Reporter",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    media: "standard",
    excerpt: "Renewable energy sources now account for a record share of total electricity generation.",
    content: "North America has reached a significant milestone in clean energy adoption, with renewable sources now providing a record percentage of total electricity. Solar and wind installations have expanded rapidly, driven by declining costs and supportive policies.",
    body: [
      "North America has reached a significant milestone in clean energy adoption, with renewable sources now providing a record percentage of total electricity.",
      "Solar and wind installations have expanded rapidly, driven by declining costs and supportive policies.",
      "Energy analysts project continued growth as battery storage technology improves and becomes more affordable."
    ],
    tags: ["North America", "Energy", "Environment"],
    readTime: "5 min read",
    comments: 21,
    views: 5500,
  },
];

async function seed() {
  await connectDB();

  await mongoose.connection.dropDatabase();
  console.log(" Database dropped");

  const passwordHash = await bcrypt.hash("Admin@123", 10);
  await User.create({
    username: "admin",
    email: "admin@hexanews.com",
    passwordHash,
    role: "admin",
    name: "HEXA NEWS Admin",
  });
  console.log(" Admin user created (admin / Admin@123)");

  await Category.insertMany(categoriesData);
  console.log(` ${categoriesData.length} categories created`);

  const articles = articlesData.map((a, i) => ({
    ...a,
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    published: true,
    createdAt: new Date(Date.now() - i * 86400000),
  }));
  await Article.insertMany(articles);
  console.log(` ${articles.length} articles created`);

  console.log("\n Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
