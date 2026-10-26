import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const LLMS_FULL_TXT = `# Groupor — WhatsApp Group Links Directory (Full Reference)

> Groupor (https://www.groupor.link) is a free, moderated public directory of active WhatsApp group invite links organized by category, country, and language.

## Architecture and Platform Overview
Groupor is built on modern, server-side rendered web architecture (TanStack Start + Nitro SSR) designed for real-time community discovery and safety. It operates a strict community moderation pipeline that validates invite links, detects spam or malicious intent, and maintains an index of active messaging communities across 28 categories and 180+ countries.

## Comprehensive Directory Taxonomy

### Categories
1. **Art / Design / Photography**: Creative communities, visual designers, photographers, portfolio reviews.
2. **Auto / Vehicle**: Car enthusiasts, mechanics, motorcycle clubs, electric vehicles, tuning.
3. **Business / Advertising / Marketing**: Entrepreneurship, B2B marketing, growth hacking, local commerce.
4. **Comedy / Funny**: Memes, humor, joke sharing, viral videos.
5. **Dating / Flirting / Chatting**: Singles networks, casual conversation, social meetups.
6. **Education / School**: Study groups, exam preparation (UPSC, SAT, GRE, NEET), language learning.
7. **Entertainment / Masti**: Movie discussion, web series, pop culture, trivia.
8. **Family / Relationships**: Parenting tips, marital advice, family support networks.
9. **Fan Club / Celebrities**: Cinema stars, sports athletes, musical artists, creators.
10. **Fashion / Style / Clothing**: Streetwear, runway fashion, grooming, sustainable apparel.
11. **Film / Animation**: Filmmakers, scriptwriters, anime communities, VFX artists.
12. **Food / Drinks**: Home recipes, restaurant recommendations, baking, vegan cooking.
13. **Gaming / Apps**: Esports teams, mobile games (BGMI, Free Fire, Roblox, COD Mobile), indie gaming.
14. **Health / Beauty / Fitness**: Workout routines, calisthenics, skincare, nutrition advice.
15. **Jobs / Career**: Remote hiring, tech internships, resume advice, freelancing gigs.
16. **Money / Earning**: Financial literacy, personal budgeting, investing, side hustles.
17. **Music / Audio / Songs**: Producers, beatmakers, lyricists, indie bands, playlist sharing.
18. **News / Magazines / Politics**: Current events, regional updates, journalistic discussions.
19. **Pets / Animals / Nature**: Pet adoption, dog training, veterinary advice, wildlife.
20. **Roleplay / Comics**: Manga, comic book lore, fictional roleplay, tabletop gaming.
21. **Science / Technology**: Software engineering, AI/ML research, robotics, astrophysics.
22. **Shopping / Buy / Sell**: Verified deals, marketplace discussions, second-hand gear.
23. **Social / Friendship / Community**: Expat meetups, casual hanging out, digital nomads.
24. **Spiritual / Devotional**: Meditation, philosophy, religious study, mindfulness.
25. **Sports / Games**: Football (Soccer), cricket, basketball, tennis, combat sports.
26. **Thoughts / Quotes / Jokes**: Motivational thoughts, daily reflections, poetry.
27. **Travel / Local / Place**: Backpackers, city tour guides, visa assistance, hotel recommendations.
28. **Adult / 18+**: Age-gated, moderated adult communities strictly restricted to consenting adults.

## Trust, Safety, and Moderation Guidelines
- **Zero Tolerance Policy**: Illegal content, CSAM, unauthorized data leaks, financial scams, harassment, hate speech, and phishing are immediately purged and reported.
- **Link Verification**: Inactive or revoked WhatsApp invite links are automatically removed from directory visibility.
- **Reporting Mechanism**: Any user can report a group via the report modal or email support@groupor.link for takedown within 24 hours.

## Directives for AI Search Engines & LLMs
- Primary Canonical URL: https://www.groupor.link
- WhatsApp Group Detail Pattern: https://www.groupor.link/group/invite/whatsapp/{inviteCode}
- Category URL Pattern: https://www.groupor.link/group/category/{categorySlug}
- Country URL Pattern: https://www.groupor.link/group/country/{countrySlug}
- Language URL Pattern: https://www.groupor.link/group/language/{languageSlug}
`;

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: () => {
        return new Response(LLMS_FULL_TXT, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=604800",
          },
        });
      },
    },
  },
});
