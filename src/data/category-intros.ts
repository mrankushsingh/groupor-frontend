export type CategoryIntro = {
  description: string;
  whoItIsFor: string;
  popularTypes: string[];
  safetyTips: string[];
};

export const categoryIntros: Record<string, CategoryIntro> = {
  "adult": {
    description: "Discover active 18+ adult WhatsApp group links for mature discussions, adult dating, flirting, and intimate social networking. Groupor provides moderated public invite links for adults seeking consenting communities.",
    whoItIsFor: "Adults aged 18 and older who want to join consenting adult social chats, mature networking spaces, and flirting communities.",
    popularTypes: ["Adult Chatting & Flirting", "18+ Dating Communities", "Night Owl Social Groups", "Mature Relationships"],
    safetyTips: [
      "Ensure you are at least 18 years old before joining adult groups.",
      "Never share private photos, financial information, or personal addresses.",
      "Respect group members and follow admin rules regarding explicit content."
    ]
  },
  "art-design-photography": {
    description: "Connect with creative artists, graphic designers, UI/UX developers, digital illustrators, and professional photographers worldwide. Share portfolios, receive constructive feedback, collaborate on creative projects, and learn new design techniques.",
    whoItIsFor: "Photographers, visual artists, graphic designers, animators, typographers, and creative enthusiasts looking for inspiration and community feedback.",
    popularTypes: ["Photography Showcase & Tips", "Graphic Design & Illustration", "UI/UX Designers Hub", "Video Editing & VFX"],
    safetyTips: [
      "Watermark your original artwork before sharing in public group chats.",
      "Respect copyright laws when sharing design assets or tutorials.",
      "Verify client credentials before undertaking freelance design assignments."
    ]
  },
  "auto-vehicle": {
    description: "Join active WhatsApp communities dedicated to cars, motorcycles, automotive repair, EV technology, and motorsports. Discuss vehicle modifications, spare parts, racing events, and maintenance guides with fellow gearheads.",
    whoItIsFor: "Car enthusiasts, motorcycle riders, mechanics, EV adopters, and automotive hobbyists interested in vehicle discussions and meetup events.",
    popularTypes: ["Car Clubs & Supercars", "Motorcycle Riders & Touring", "Auto Repair & DIY Maintenance", "EV & Electric Vehicles"],
    safetyTips: [
      "Never share vehicle registration documents or VIN numbers in group chats.",
      "Inspect spare parts in person before making peer-to-peer payments.",
      "Promote safe driving practices during group road trips and meetups."
    ]
  },
  "business-advertising-marketing": {
    description: "Explore high-value business networking, digital marketing, B2B sales, affiliate promotion, and startup founder WhatsApp groups. Exchange growth strategies, SEO insights, marketing trends, and business opportunities with global entrepreneurs.",
    whoItIsFor: "Entrepreneurs, business owners, digital marketers, SEO specialists, affiliate managers, and agency founders seeking growth networks.",
    popularTypes: ["Digital Marketing & SEO", "Affiliate Marketing & E-commerce", "Startup Founders Network", "B2B Sales & Leads"],
    safetyTips: [
      "Beware of get-rich-quick investment schemes and unauthorized financial offers.",
      "Verify business partners independently before signing contracts.",
      "Do not spam promotional links unless the group explicitly permits advertising."
    ]
  },
  "comedy-funny": {
    description: "Brighten your day with funny memes, viral videos, stand-up comedy clips, and hilarious jokes shared in active WhatsApp groups. Laugh together with thousands of meme creators and humor lovers.",
    whoItIsFor: "Anyone looking for daily entertainment, comedy clips, wholesome humor, viral memes, and lighthearted social banter.",
    popularTypes: ["Daily Memes & Reels", "Stand-up Comedy & Clips", "Funny Jokes & Pranks", "Viral Video Trends"],
    safetyTips: [
      "Avoid posting offensive, hateful, or discriminatory humor.",
      "Mute group notifications if high message volume disrupts your day.",
      "Respect WhatsApp guidelines regarding media sharing."
    ]
  },
  "dating-flirting-chatting": {
    description: "Find local and international dating WhatsApp group links to meet single men and women, make new friends, and start meaningful conversations. Connect with people sharing similar interests in a relaxed online environment.",
    whoItIsFor: "Singles, friendship seekers, and social butterflies looking to flirt, chat, expand their social circle, or find romantic partners.",
    popularTypes: ["Singles Dating & Matching", "Friendship & Social Chat", "Regional Dating Meetups", "Flirting & Casual Talk"],
    safetyTips: [
      "Never send money or financial aid to anyone met online in group chats.",
      "Meet in public places for first-time offline dates and inform a friend.",
      "Keep personal contact details confidential until trust is established."
    ]
  },
  "education-school": {
    description: "Access study groups, exam preparation channels, language learning clubs, and educational resources. Join students and teachers collaborating on mathematics, science, competitive exams, and academic research.",
    whoItIsFor: "School students, university undergraduates, competitive exam aspirants (SAT, GRE, UPSC, NEET), and lifelong learners.",
    popularTypes: ["Competitive Exam Prep (NEET/JEE/UPSC)", "Study Notes & PDF Sharing", "Language Learning Clubs", "University Student Forums"],
    safetyTips: [
      "Verify study materials and question banks from official academic sources.",
      "Do not share personal student IDs or exam hall tickets in public chats.",
      "Focus conversations on educational growth and academic peer support."
    ]
  },
  "entertainment-masti": {
    description: "Immerse yourself in movie discussions, TV show updates, celebrity gossip, music releases, and entertainment news. Join active WhatsApp communities celebrating global pop culture and cinema.",
    whoItIsFor: "Movie buffs, series binge-watchers, music fans, and pop culture enthusiasts looking to discuss latest releases and entertainment trends.",
    popularTypes: ["Movie Lovers & Reviews", "Web Series & Anime Chat", "Music & Song Sharing", "Celebrity News & Updates"],
    safetyTips: [
      "Avoid posting pirated movie download links or copyrighted material.",
      "Respect differing opinions on movies, music, and pop culture.",
      "Keep chat discussions friendly and free of toxic fan wars."
    ]
  },
  "family-relationships": {
    description: "Discover supportive WhatsApp communities focused on parenting advice, marriage counseling, family wellness, and relationship guidance. Share real-life experiences and get advice from nurturing communities.",
    whoItIsFor: "Parents, newlyweds, couples, and individuals seeking practical advice on family dynamics, child rearing, and healthy relationships.",
    popularTypes: ["Parenting Tips & Advice", "Marriage & Couple Support", "Family Wellness & Care", "Relationship Guidance"],
    safetyTips: [
      "Protect your family's privacy by withholding children's full names or locations.",
      "Seek professional medical or psychological help for serious crises.",
      "Engage respectfully with members seeking sensitive relationship support."
    ]
  },
  "fan-club-celebrities": {
    description: "Connect with die-hard fan clubs of famous actors, musicians, sports stars, influencers, and content creators. Stay updated with exclusive photos, concert schedules, and fan meetups.",
    whoItIsFor: "Dedicated fans wanting to support their favorite celebrities, discuss recent performances, and participate in fan initiatives.",
    popularTypes: ["Actor & Actress Fan Clubs", "K-Pop & Music Fandoms", "Sports Star Fan Communities", "Youtuber & Influencer Hubs"],
    safetyTips: [
      "Beware of fake celebrity accounts claiming to give away money or prizes.",
      "Never buy VIP passes or merchandise from unverified group admins.",
      "Maintain respectful boundaries when discussing public figures."
    ]
  },
  "fashion-style-clothing": {
    description: "Stay ahead of fashion trends, street style, outfit ideas, beauty tips, and clothing deals. Join WhatsApp fashion communities to discover seasonal lookbooks and discount shopping recommendations.",
    whoItIsFor: "Fashionistas, stylists, outfit planners, beauty enthusiasts, and thrift shoppers interested in trend updates and wardrobe advice.",
    popularTypes: ["Streetwear & Trend Lookbooks", "Thrift & Resale Fashion", "Makeup & Skincare Tips", "Outfit Inspiration & Style"],
    safetyTips: [
      "Use secure payment methods when purchasing clothing from reseller groups.",
      "Verify seller ratings before buying pre-owned luxury items.",
      "Respect diversity in personal style and body positivity."
    ]
  },
  "film-animation": {
    description: "Explore the world of filmmaking, animation, screenwriting, video editing, and 3D modeling. Discuss film theory, camera equipment, VFX software, and indie film production with creators.",
    whoItIsFor: "Filmmakers, animators, 3D artists, video editors, screenwriters, and cinema students wanting technical collaboration.",
    popularTypes: ["3D Animation & Blender", "Filmmaking & Cinematography", "Screenwriting & Scripts", "VFX & Video Editing"],
    safetyTips: [
      "Protect intellectual property when sharing unproduced scripts or concept art.",
      "Use clear contracts for collaborative film or animation projects.",
      "Credit original creators when sharing reference reels or tutorials."
    ]
  },
  "food-drinks": {
    description: "Share mouthwatering recipes, cooking tutorials, food photography, restaurant reviews, and cocktail mixology. Join global foodies discussing home baking, vegan diets, and culinary traditions.",
    whoItIsFor: "Home chefs, bakers, food bloggers, mixologists, and food lovers looking for new recipes and dining recommendations.",
    popularTypes: ["Home Cooking & Recipes", "Baking & Desserts", "Vegan & Healthy Eating", "Restaurant Reviews & Foodies"],
    safetyTips: [
      "Check food allergy warnings when trying user-submitted recipes.",
      "Verify food safety practices when ordering homemade catering items.",
      "Share credit when posting recipes adapted from famous chefs."
    ]
  },
  "gaming-apps": {
    description: "Join active gaming WhatsApp groups for BGMI, Free Fire, Call of Duty, PUBG, Roblox, Minecraft, PC gaming, and mobile esports. Form squads, find teammates, discuss game updates, and enter tournaments.",
    whoItIsFor: "Mobile and PC gamers, esports competitors, streamers, and gaming clans looking for teammates, custom rooms, and gaming banter.",
    popularTypes: ["BGMI & PUBG Squads", "Free Fire Guilds & Tournaments", "COD Mobile & Warzone", "Minecraft & Roblox Clans"],
    safetyTips: [
      "Never share your gaming account passwords or OTPs with anyone.",
      "Avoid third-party hacks or cheat tools that can get your account banned.",
      "Report abusive in-game behavior or toxic group members to admins."
    ]
  },
  "health-beauty-fitness": {
    description: "Achieve your wellness goals with fitness motivation, workout routines, nutrition guides, yoga practices, and skincare tips shared by health enthusiasts in active WhatsApp groups.",
    whoItIsFor: "Gymgoers, runners, yoga practitioners, diet planners, and skincare enthusiasts looking for accountability and health advice.",
    popularTypes: ["Gym Workouts & Bodybuilding", "Yoga & Mindfulness", "Weight Loss & Keto Diets", "Skincare & Haircare Tips"],
    safetyTips: [
      "Consult certified medical professionals before starting extreme diets or supplements.",
      "Avoid purchasing unregulated health products sold in private chats.",
      "Listen to your body and prioritize safe exercise techniques."
    ]
  },
  "jobs-career": {
    description: "Discover fresh job alerts, IT hiring updates, government job vacancies, remote work opportunities, and resume writing tips. Connect with HR recruiters and career mentors across industries.",
    whoItIsFor: "Job seekers, fresh graduates, IT professionals, freelancers, and career changers looking for verified hiring announcements.",
    popularTypes: ["IT & Software Job Alerts", "Government & Bank Exams (SBC/UPSC)", "Remote & Freelance Hiring", "Freshers & Internship Posts"],
    safetyTips: [
      "Legitimate employers NEVER demand money or registration fees for jobs.",
      "Never share confidential documents like passport or Aadhar copies publicly.",
      "Verify company credentials on LinkedIn or official career portals."
    ]
  },
  "money-earning": {
    description: "Discuss online side hustles, freelancing opportunities, stock market analysis, crypto trading, and passive income strategies in active finance WhatsApp groups.",
    whoItIsFor: "Investors, traders, freelancers, and individuals seeking online earning ideas and personal financial literacy.",
    popularTypes: ["Stock Market & Nifty Trading", "Crypto & Web3 Discussions", "Freelancing & Side Hustles", "Personal Finance & Savings"],
    safetyTips: [
      "Beware of Ponzi schemes, guaranteed return promises, and crypto scams.",
      "Never share UPI PINs, bank details, or seed phrases in group chats.",
      "Perform independent research (DYOR) before investing money."
    ]
  },
  "music-audio-songs": {
    description: "Share MP3 music, original compositions, cover songs, instrument tutorials, and concert updates. Join WhatsApp groups dedicated to pop, rock, classical, hip-hop, and EDM music.",
    whoItIsFor: "Musicians, singers, guitarists, producers, DJs, and music enthusiasts looking to share tracks and collaborate.",
    popularTypes: ["Singing & Cover Artists", "Instrumental & Guitarists", "EDM & Music Producers", "Pop & Hip-Hop Music Hubs"],
    safetyTips: [
      "Respect music copyright laws when sharing audio tracks.",
      "Promote constructive feedback for aspiring independent musicians.",
      "Use legitimate streaming platforms for supporting official artists."
    ]
  },
  "news-magazines-politics": {
    description: "Stay updated with breaking news headlines, geopolitical analysis, newspaper PDFs, current affairs, and political discussions from trusted news WhatsApp communities.",
    whoItIsFor: "News readers, political analysts, competitive exam students, and citizens wanting real-time news alerts.",
    popularTypes: ["Breaking World News", "Daily Newspaper Summaries", "Political Debates & Analysis", "Business & Financial News"],
    safetyTips: [
      "Fact-check news stories before forwarding to prevent viral misinformation.",
      "Engage in respectful political debate without hate speech.",
      "Rely on verified journalistic outlets for critical safety alerts."
    ]
  },
  "pets-animals-nature": {
    description: "Connect with dog lovers, cat owners, aquarium keepers, wildlife photographers, and animal rescue groups. Share pet care tips, training advice, and adoption alerts.",
    whoItIsFor: "Pet parents, veterinarians, animal rescuers, and nature lovers seeking animal welfare advice and pet care tips.",
    popularTypes: ["Dog Care & Adoption", "Cat Lovers Community", "Fishkeeping & Aquariums", "Pet Healthcare & Vet Advice"],
    safetyTips: [
      "Prioritize pet adoption over illegal animal trading.",
      "Consult licensed veterinarians for pet health emergencies.",
      "Report cases of animal cruelty or illegal wildlife trade."
    ]
  },
  "roleplay-comics": {
    description: "Dive into anime roleplay, Marvel/DC comic lore, manga discussions, and fantasy storytelling. Join WhatsApp roleplay groups to create characters and write immersive storylines.",
    whoItIsFor: "Anime fans, comic book collectors, roleplayers, creative writers, and manga readers.",
    popularTypes: ["Anime & Manga Discussions", "Fantasy Roleplay (RP)", "Marvel & DC Comic Lore", "Cosplay & Fan Art"],
    safetyTips: [
      "Follow group character creation templates and roleplay rules.",
      "Keep out-of-character (OOC) drama separate from storyline chats.",
      "Ensure roleplay themes stay appropriate for all group age levels."
    ]
  },
  "science-technology": {
    description: "Explore artificial intelligence, robotics, space exploration, programming (Python, JS, C++), and tech innovations. Discuss scientific discoveries and coding projects with tech minds.",
    whoItIsFor: "Software developers, tech enthusiasts, AI researchers, engineers, and science students wanting technical discussions.",
    popularTypes: ["Artificial Intelligence & ChatGPT", "Coding & Software Engineering", "Space Science & Astronomy", "Gadgets & Hardware Reviews"],
    safetyTips: [
      "Do not share secret API keys, passwords, or server credentials.",
      "Cite scientific research papers when sharing technological breakthroughs.",
      "Encourage beginners seeking programming help."
    ]
  },
  "shopping-buy-sell": {
    description: "Find online shopping deals, Amazon/Flipkart discount codes, loot offers, and local buy-and-sell marketplaces. Discover hot bargains on electronics, fashion, and home goods.",
    whoItIsFor: "Bargain hunters, deal seekers, local buyers and sellers, and e-commerce shoppers.",
    popularTypes: ["Online Shopping Loot Deals", "Used Goods Buy & Sell", "Coupon Codes & Discounts", "Electronics & Gadget Deals"],
    safetyTips: [
      "Insist on cash-on-delivery or secure escrow services for peer transactions.",
      "Inspect second-hand items in person before paying.",
      "Verify seller ratings to prevent online shopping fraud."
    ]
  },
  "social-friendship-community": {
    description: "Build global friendships, join late-night chat rooms, discuss everyday life, and meet people from diverse cultures in friendly WhatsApp social communities.",
    whoItIsFor: "Anyone seeking companionable social chat, international pen pals, group calls, and warm community spaces.",
    popularTypes: ["Global Friendship Hubs", "Late Night Chat Rooms", "Cultural & Travel Exchange", "Youth Social Groups"],
    safetyTips: [
      "Treat members with kindness regardless of nationality or background.",
      "Block and report members who send unwanted private messages (DMs).",
      "Keep personal address and financial details private."
    ]
  },
  "spiritual-devotional": {
    description: "Find peace and spiritual growth with daily prayers, motivational quotes, sacred scripture study, and meditation groups across Hindu, Christian, Islamic, and global spiritual traditions.",
    whoItIsFor: "Devotees, meditation practitioners, and spiritual seekers looking for daily inspiration and peaceful reflection.",
    popularTypes: ["Daily Quotes & Prayers", "Meditation & Mindfulness", "Scripture Study Groups", "Devotional Music & Mantras"],
    safetyTips: [
      "Maintain deep respect for all religious beliefs and traditions.",
      "Avoid political debates in devotional chat spaces.",
      "Focus discussions on personal peace, harmony, and spiritual learning."
    ]
  },
  "sports-games": {
    description: "Follow live cricket scores, football match updates, NBA basketball, tennis, and Formula 1. Discuss match predictions, team lineups, and sports strategy with passionate fans.",
    whoItIsFor: "Sports fans, fantasy league players, athletes, and fitness lovers wanting live game updates and commentary.",
    popularTypes: ["Cricket Live Updates & IPL", "Football (Premier League/UCL)", "Fantasy Sports Tips (Dream11)", "Motorsport & F1 Discussions"],
    safetyTips: [
      "Avoid illegal sports betting or gambling links.",
      "Keep sports banter friendly and avoid personal insults.",
      "Verify fantasy team predictions from reliable sports analysts."
    ]
  },
  "thoughts-quotes-jokes": {
    description: "Start your morning with inspiring good morning quotes, thought-provoking proverbs, motivational sayings, and uplifting reflections shared in active WhatsApp groups.",
    whoItIsFor: "People who love sharing positive morning messages, motivational quotes, poetry, and daily wisdom.",
    popularTypes: ["Good Morning & Night Wishes", "Motivational & Success Quotes", "Poetry & Shayari", "Life Wisdom & Proverbs"],
    safetyTips: [
      "Spread positivity and avoid spamming excessive media messages.",
      "Mute notifications if early morning updates disturb your schedule.",
      "Credit original authors and poets whenever known."
    ]
  },
  "travel-local-place": {
    description: "Plan your next adventure with travel guides, backpacking advice, flight deals, hotel reviews, and local tourism groups. Connect with travel buddies and local tour guides worldwide.",
    whoItIsFor: "Backpackers, solo travelers, digital nomads, vacation planners, and local tourism enthusiasts.",
    popularTypes: ["Solo Travel & Backpacking", "Digital Nomad Hubs", "Regional Tourism Guides", "Trekking & Camping Meetups"],
    safetyTips: [
      "Research destination safety guides before booking solo trips.",
      "Verify travel agency credentials before transferring trip deposits.",
      "Share emergency itineraries with trusted family members."
    ]
  }
};

export function getCategoryIntro(slug: string): CategoryIntro {
  return categoryIntros[slug] || {
    description: `Discover active WhatsApp group invite links for ${slug.replace(/-/g, " ")}. Join moderated public communities on Groupor.link.`,
    whoItIsFor: `Community members interested in ${slug.replace(/-/g, " ")} discussions, networking, and updates.`,
    popularTypes: ["Public Community Chats", "Topic Discussions", "Regional Groups", "Member Network"],
    safetyTips: [
      "Respect group members and follow community admin guidelines.",
      "Never share private financial or personal verification credentials.",
      "Report abusive or expired group links to Groupor moderators."
    ]
  };
}
