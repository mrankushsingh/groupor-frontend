import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, AlertCircle } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { categories, countries, inviteCodeOf, languages } from "@/data/groups";
import { fetchGroupPreview } from "@/lib/whatsapp.functions";
import { checkInviteAllowed } from "@/lib/report.functions";
import { CSRF_FIELD, CSRF_HEADER } from "@/lib/csrf.shared";
import { issueSubmitGuard } from "@/lib/csrf.functions";
import { apiUrl, hasRemoteApi } from "@/lib/api";
import { cacheSubmittedGroup, findGroupByLink, inviteCode, normalizeApiGroup } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { trackEvent } from "@/lib/analytics";



export const Route = createFileRoute("/group/addgroup")({
  head: () => ({
    meta: [
      { title: "Add Your WhatsApp Group — Groupor.link" },
      {
        name: "description",
        content:
          "Add your WhatsApp group invite link to Groupor.link for free and reach thousands of new members.",
      },
      { property: "og:title", content: "Add Your WhatsApp Group — Groupor.link" },
      {
        property: "og:description",
        content: "Share your WhatsApp group link with thousands of people, free.",
      },
      { property: "og:url", content: "https://groupor.link/group/addgroup" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/group/addgroup" }],
  }),
  component: SubmitPage,
});
/** Accepts links pasted without a scheme or with stray spaces. */
function normalizeLink(value: string) {
  const trimmed = (value ?? "").trim().replace(/\s+/g, "");
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^(www\.)?chat\.whatsapp\.com\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/** Readable name used when WhatsApp does not return preview metadata. */
function fallbackName(value: string) {
  const code = inviteCode(value);
  return code ? `WhatsApp Group ${code.slice(0, 8)}` : "WhatsApp Group";
}

function SubmitPage() {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [previewNote, setPreviewNote] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [duplicate, setDuplicate] = useState<ReturnType<typeof findGroupByLink>>(null);
  const [blocked, setBlocked] = useState("");
  const getPreview = useServerFn(fetchGroupPreview);
  const checkAllowed = useServerFn(checkInviteAllowed);
  const getGuard = useServerFn(issueSubmitGuard);
  const { isCodeRemoved } = useRemovedGroups();
  // Split guard pieces live only in memory — not as a readable "csrf_token" input.
  const guardParts = useRef<{ a: string; b: string } | null>(null);
  const decoyRef = useRef<HTMLSpanElement>(null);
  const previewSeq = useRef(0);

  async function refreshGuard() {
    const issued = await getGuard();
    guardParts.current = { a: issued.a, b: issued.b };
    // Stash half in a decoy data attribute (looks like layout metadata).
    if (decoyRef.current) {
      decoyRef.current.dataset["layoutSeed"] = issued.b;
    }
  }

  function assembleGuard() {
    const parts = guardParts.current;
    if (!parts?.a) return "";
    const b = decoyRef.current?.dataset["layoutSeed"] || parts.b;
    return `${parts.a}${b}`;
  }

  useEffect(() => {
    void refreshGuard().catch(() => {
      // Submit will fail closed if the guard never loads.
    });
  }, []);

  // Only check for duplicates while typing/pasting — fetch name/image on submit.
  useEffect(() => {
    const value = normalizeLink(link);
    setDuplicate(findGroupByLink(value) ?? null);
    const code = inviteCode(value);
    setBlocked(
      code && isCodeRemoved(code)
        ? "This group link was reported and removed. It cannot be submitted again."
        : "",
    );
  }, [link, isCodeRemoved]);

  // Try to auto-fill name/image when a valid invite link is pasted.
  useEffect(() => {
    const value = normalizeLink(link);
    const code = inviteCode(value);
    if (!code || !/^https:\/\/chat\.whatsapp\.com\//i.test(value)) {
      setGroupName("");
      setGroupImage("");
      setPreviewNote("");
      setPreviewLoading(false);
      return;
    }

    const seq = ++previewSeq.current;
    setPreviewLoading(true);
    setPreviewNote("");
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const result = await getPreview({ data: { link: value } });
          if (seq !== previewSeq.current) return;
          if (result.ok && result.name) {
            setGroupName(result.name);
            setGroupImage(result.image || "");
            setPreviewNote(result.image ? "Name and image loaded from WhatsApp." : "Name loaded. Add an image URL if you want.");
          } else {
            setGroupName((prev) => prev || "");
            setGroupImage(result.image || "");
            setPreviewNote(
              result.error ||
                "WhatsApp did not share this group's name/image. Type the real group name below.",
            );
          }
        } catch {
          if (seq !== previewSeq.current) return;
          setPreviewNote("Could not reach WhatsApp. Type the group name manually.");
        } finally {
          if (seq === previewSeq.current) setPreviewLoading(false);
        }
      })();
    }, 450);

    return () => window.clearTimeout(timer);
  }, [link, getPreview]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-base font-bold text-foreground">Add Your WhatsApp Group</h1>

        <form
          method="post"
          action="/data/addgroup"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const href = normalizeLink(link);
            if (!href || loading) return;

            const code = inviteCode(href);
            if (!code) return;

            const existing = findGroupByLink(href);
            if (existing) {
              setDuplicate(existing);
              return;
            }

            setLoading(true);
            setBlocked("");
            try {
              const allowed = await checkAllowed({ data: { inviteCode: code } });
              if (!allowed.ok) {
                setBlocked(allowed.message);
                return;
              }

              let finalName = groupName.trim() || fallbackName(href);
              let finalImage = groupImage.trim();
              if (!groupName.trim() || !finalImage) {
                try {
                  const result = await getPreview({ data: { link: href } });
                  if (result.name) finalName = result.name;
                  if (result.image) finalImage = result.image;
                } catch {
                  // Keep typed/fallback values when WhatsApp preview is unavailable.
                }
              }
              if (!groupName.trim() && finalName === fallbackName(href)) {
                setBlocked("Enter the real WhatsApp group name. WhatsApp no longer shares it automatically.");
                return;
              }

              const guard = assembleGuard();
              if (!hasRemoteApi() && !guard) {
                setBlocked("Security check missing. Refresh the page and try again.");
                await refreshGuard().catch(() => undefined);
                return;
              }

              const payload = {
                link: href,
                name: finalName,
                image: finalImage,
                description: description.trim(),
                category: category || "all",
                country,
                language,
                tags,
                ...(hasRemoteApi() ? {} : { [CSRF_FIELD]: guard }),
              };

              const endpoint = hasRemoteApi() ? apiUrl("/api/groups") : "/data/addgroup";
              const res = await fetch(endpoint, {
                method: "POST",
                credentials: hasRemoteApi() ? "omit" : "same-origin",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  ...(hasRemoteApi() || !guard ? {} : { [CSRF_HEADER]: guard }),
                },
                body: JSON.stringify(payload),
              });
              const raw = (await res.json()) as Record<string, unknown>;
              const result = {
                ok: Boolean(raw["ok"] ?? res.ok),
                message:
                  typeof raw["message"] === "string"
                    ? raw["message"]
                    : typeof raw["detail"] === "string"
                      ? raw["detail"]
                      : undefined,
                group: raw["group"] as Parameters<typeof cacheSubmittedGroup>[0] | undefined,
                code:
                  typeof raw["code"] === "string"
                    ? raw["code"]
                    : typeof (raw["group"] as { invite_code?: string } | undefined)?.invite_code ===
                        "string"
                      ? (raw["group"] as { invite_code: string }).invite_code
                      : undefined,
                path: typeof raw["path"] === "string" ? raw["path"] : undefined,
              };

              // Token is one-time; refresh for a retry after any failure.
              if (!hasRemoteApi()) {
                await refreshGuard().catch(() => undefined);
              }

              if (!result.ok || !result.group || !result.code) {
                setBlocked(result.message || "Could not save the group.");
                return;
              }

              // Normalize Railway API shape into local Group cache.
              const cached = hasRemoteApi()
                ? normalizeApiGroup(result.group)
                : result.group;
              if (!cached) {
                setBlocked("Could not save the group.");
                return;
              }
              cacheSubmittedGroup(cached);
              trackEvent("group_submission", {
                category: category || "all",
                country,
              });

              await navigate({
                to: "/group/invite/whatsapp/$code",
                params: { code: result.code },
              });
            } finally {
              setLoading(false);
            }
          }}
          className="mt-6 space-y-4"
        >
            {/* Decoy span holds half the submit guard; not named csrf/token. */}
            <span ref={decoyRef} className="hidden" aria-hidden="true" data-layout-seed="" />
            <div>
              <input
                required
                type="text"
                inputMode="url"
                name="link"
                maxLength={300}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className={inputClass}
                placeholder="Enter WhatsApp Group Invite Link..."
                disabled={loading}
              />
              <p className="mt-1 text-[11px] text-link">
                Ex:- https://chat.whatsapp.com/CIuEPPD7DuiEkai8rxFtZP or
                https://chat.whatsapp.com/invite/LZnRYvjpUVjLM6EN3iLC0L
              </p>
            </div>

            {(previewLoading || previewNote) && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                {previewLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                {previewLoading ? "Fetching group name and image…" : previewNote}
              </p>
            )}

            <div>
              <input
                required
                type="text"
                name="name"
                maxLength={80}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className={inputClass}
                placeholder="Group name (required)"
                disabled={loading}
              />
              <p className="mt-1 text-[11px] text-link">
                Use the exact WhatsApp group title. Auto-fill only works when WhatsApp still shares
                public preview data.
              </p>
            </div>

            {groupImage ? (
              <div className="flex items-center gap-3">
                <img
                  src={groupImage}
                  alt=""
                  className="size-14 rounded-full border border-border object-cover"
                />
                <p className="text-xs text-muted-foreground">Group image preview</p>
              </div>
            ) : null}

            <div>
              <input
                type="url"
                name="image"
                maxLength={1000}
                value={groupImage}
                onChange={(e) => setGroupImage(e.target.value)}
                className={inputClass}
                placeholder="Group image URL (optional)"
                disabled={loading}
              />
            </div>

            {duplicate && (
              <div className="flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>
                  This group is already listed as{" "}
                  {inviteCodeOf(duplicate.link) ? (
                    <Link
                      to="/group/invite/whatsapp/$code"
                      params={{ code: inviteCodeOf(duplicate.link) }}
                      className="font-semibold underline"
                    >
                      {duplicate.name}
                    </Link>
                  ) : (
                    <span className="font-semibold">{duplicate.name}</span>
                  )}
                  . Each invite link can only be added once.
                </span>
              </div>
            )}

            {blocked && !duplicate && (
              <div className="flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{blocked}</span>
              </div>
            )}

            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
              disabled={loading}
            >
              <option value="">Select Group Category</option>
              {categories.slice(1).map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              required
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
              disabled={loading}
            >
              <option value="">Select Group Country</option>
              {countries.slice(1).map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={inputClass}
              disabled={loading}
            >
              <option value="">Select Group Language</option>
              {languages.slice(1).map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <div>
              <input
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={inputClass}
                placeholder="Enter Tags by Comma (,) Separated (Optional)"
                disabled={loading}
              />
              <p className="mt-1 text-[11px] text-link">Funny, Jokes, City, State (Up to 100 Words)</p>
            </div>

            <div>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                maxLength={6000}
                className={inputClass}
                placeholder="Enter Group Information and Rules (Optional)"
                disabled={loading}
              />
              <p className="mt-1 text-[11px] text-link">Description length (Up to 1000 Words)</p>
            </div>

            <p className="text-xs font-semibold text-foreground">
              Note:- Your group is visible to public world wide(Everyone)
            </p>
            <p className="text-xs text-muted-foreground">
              Limit: each IP can upload 5 groups every 24 hours.
            </p>
            <p className="text-xs text-link">***Rules for group publisher</p>

            <button
              type="submit"
              disabled={!!duplicate || !!blocked || loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 border border-border bg-card px-6 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              {loading ? "Submitting…" : "Submit"}
            </button>
          </form>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="text-base font-bold text-foreground">WhatsApp Group Guide</h2>

          <div className="mt-5 space-y-6">
            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Types</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Private Groups:</strong> Only admins can add
                  new members, and the group name and description are not publicly visible.
                </li>
                <li>
                  <strong className="text-foreground">Public Groups:</strong> Anyone can join the
                  group using a public invite link, and the group name and description are publicly
                  visible.
                </li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">Creating a WhatsApp Group</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Open WhatsApp and go to the "Chats" tab.</li>
                <li>Tap the "New Group" button.</li>
                <li>Select the contacts you want to add to the group.</li>
                <li>Tap "Next" and enter a group name (up to 25 characters).</li>
                <li>Add a group description (optional) and tap "Create."</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">
                Inactive or Revoke a WhatsApp Group Link
              </h3>
              <div className="mt-2 space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Method 1: As a Group Admin</p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5">
                    <li>Open WhatsApp and go to the group chat.</li>
                    <li>Tap the group subject or name.</li>
                    <li>Tap "Group info".</li>
                    <li>Scroll down and tap "Invite to group".</li>
                    <li>Tap "Revoke link".</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium text-foreground">Method 2: As a Group Admin (Alternative)</p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5">
                    <li>Open WhatsApp and go to the group chat.</li>
                    <li>Tap the three dots (⋮) at the top right corner.</li>
                    <li>Tap "Group settings".</li>
                    <li>Tap "Group link".</li>
                    <li>Tap "Revoke link".</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium text-foreground">Method 3: Using the WhatsApp Group Settings</p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5">
                    <li>Open WhatsApp and go to the group chat.</li>
                    <li>Tap the group subject or name.</li>
                    <li>Tap "Group settings".</li>
                    <li>Scroll down and tap "Group link".</li>
                    <li>
                      Tap the toggle switch next to "Shareable link" to turn it off.
                    </li>
                  </ol>
                </div>
                <p>
                  After revoking the link, the group link will be inactive, and new members will not
                  be able to join using the old link. As a group admin, you can always generate a new
                  link if needed.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Features for Admins</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Add/Remove Members: Admins can add or remove members from the group.</li>
                <li>Change Group Name/Description: Admins can change the group name and description.</li>
                <li>Set Group Icon: Admins can set a custom icon for the group.</li>
                <li>
                  Manage Group Settings: Admins can adjust group settings, such as deciding who can
                  send messages.
                </li>
                <li>Promote/Demote Admins: Admins can promote or demote other members to become admins.</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Features</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Group Chats: Send messages, photos, videos, and files to multiple people at once.</li>
                <li>Group Size: Up to 256 people can be added to a WhatsApp group.</li>
                <li>Admins: Group admins have control over the group, including adding or removing members.</li>
                <li>
                  Group Settings: Admins can adjust group settings, such as deciding who can send
                  messages.
                </li>
                <li>
                  End-to-End Encryption: WhatsApp groups are end-to-end encrypted, ensuring only group
                  members can read messages.
                </li>
                <li>File Sharing: Share documents, images, and videos with group members.</li>
                <li>Group Invite Links: Admins can create invite links to add new members.</li>
                <li>Group Categories: WhatsApp groups can be categorized into different types (e.g., work, family, friends).</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Settings</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Group Name: Change the group name (up to 25 characters).</li>
                <li>Group Description: Add or edit a group description.</li>
                <li>Group Icon: Change the group icon.</li>
                <li>Group Settings: Decide who can send messages (all members or only admins).</li>
                <li>Who Can Change Group Info: Choose who can change group settings (all members or only admins).</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">Managing WhatsApp Group Members</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Adding Members: Admins can add new members via contact selection or invite link.</li>
                <li>Removing Members: Admins can remove members from the group.</li>
                <li>Promoting Members to Admin: Admins can promote members to become group admins.</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Etiquette</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Be Respectful: Treat others with respect and kindness.</li>
                <li>Stay on Topic: Keep conversations relevant to the group's purpose.</li>
                <li>Avoid Spam: Refrain from sending unnecessary or repetitive messages.</li>
                <li>Use Group Settings: Adjust group settings to manage notifications and message sending.</li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group Limitations</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Member Limit: Maximum of 256 members per group.</li>
                <li>File Size Limit: Maximum file size for sharing is 100 MB.</li>
                <li>
                  Message Limit: No limit on messages, but excessive messaging may lead to account
                  restrictions.
                </li>
              </ol>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">WhatsApp Group FAQs</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>How do I create a WhatsApp group?: Follow the steps outlined above.</li>
                <li>How do I add members to a WhatsApp group?: Admins can add members via contact selection or invite link.</li>
                <li>Can I change the group name or description?: Yes, admins can change the group name and description.</li>
                <li>How do I leave a WhatsApp group?: Members can leave a group by tapping "Exit Group" in the group settings.</li>
              </ol>
            </section>

            <p className="text-sm text-muted-foreground">
              By following these guidelines and best practices, you can effectively manage and
              participate in WhatsApp groups.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
