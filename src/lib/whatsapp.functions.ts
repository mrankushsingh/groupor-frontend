import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  link: z.string().url().max(300),
});

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function metaContent(html: string, property: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
      "i",
    ),
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match?.[1]) return decodeEntities(match[1]);
  }
  return "";
}

export type GroupPreview = {
  ok: boolean;
  name: string;
  image: string;
  description: string;
  error?: string;
};

/**
 * Fetches a WhatsApp invite page server-side and reads its Open Graph
 * metadata so the group name + icon can be filled in automatically.
 */
export const fetchGroupPreview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<GroupPreview> => {
    let url: URL;
    try {
      url = new URL(data.link);
    } catch {
      return { ok: false, name: "", image: "", description: "", error: "Invalid link" };
    }

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host !== "chat.whatsapp.com") {
      return {
        ok: false,
        name: "",
        image: "",
        description: "",
        error: "Only chat.whatsapp.com invite links are supported",
      };
    }

    try {
      const previewUrl = `https://chat.whatsapp.com${url.pathname}`;
      const res = await fetch(previewUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; WhatsAppBot/1.0; +https://www.whatsapp.com)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "manual",
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location") ?? "";
        let redirectedHost = "";
        try {
          redirectedHost = new URL(location, previewUrl).hostname
            .replace(/^www\./, "")
            .toLowerCase();
        } catch {
          redirectedHost = "";
        }
        if (redirectedHost !== "chat.whatsapp.com") {
          return {
            ok: false,
            name: "",
            image: "",
            description: "",
            error: "Unexpected redirect from WhatsApp",
          };
        }
        return {
          ok: false,
          name: "",
          image: "",
          description: "",
          error: "Could not read this invite right now",
        };
      }

      if (!res.ok) {
        return {
          ok: false,
          name: "",
          image: "",
          description: "",
          error: `WhatsApp returned ${res.status}`,
        };
      }

      const html = (await res.text()).slice(0, 400_000);
      const ogTitle = metaContent(html, "og:title");
      const title =
        ogTitle || decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "");
      const rawImage = metaContent(html, "og:image");
      let image = "";
      try {
        const imageUrl = new URL(rawImage);
        if (imageUrl.protocol === "https:") image = imageUrl.toString();
      } catch {
        image = "";
      }
      // WhatsApp often returns only a generic site icon — not the group photo.
      if (
        /static\.whatsapp\.net\/rsrc\.php/i.test(image) ||
        /whatsapp\.net\/.*\.(svg|png)$/i.test(image)
      ) {
        image = "";
      }
      const description = metaContent(html, "og:description");

      const generic =
        !title.trim() ||
        /^whatsapp( group invite)?$/i.test(title.trim()) ||
        /^whatsapp\.com$/i.test(title.trim());
      if (generic) {
        return {
          ok: false,
          name: "",
          image,
          description,
          error:
            "WhatsApp no longer shares this group's public name. Enter the group name manually.",
        };
      }

      return { ok: true, name: title.slice(0, 80), image, description: description.slice(0, 300) };
    } catch {
      return {
        ok: false,
        name: "",
        image: "",
        description: "",
        error: "Could not reach WhatsApp right now",
      };
    }
  });
