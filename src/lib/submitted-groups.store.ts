import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Group } from "@/data/groups";
import { inviteCodeOf, joinUrl } from "@/data/groups";
import { isInviteReported } from "@/lib/reported-groups.store";

type Store = { groups: Group[] };

const STORE_PATH = path.join(process.cwd(), "data", "submitted-groups.json");

let cache: Store | null = null;

async function readStore(): Promise<Store> {
  if (cache) return cache;
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Store;
    cache = {
      groups: Array.isArray(parsed?.groups) ? (parsed.groups as Group[]) : [],
    };
  } catch {
    cache = { groups: [] };
  }
  return cache;
}

async function writeStore(store: Store) {
  cache = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.error("[submitted-groups] failed to persist store", error);
  }
}

export async function listSubmittedGroups(): Promise<Group[]> {
  const store = await readStore();
  return store.groups;
}

export async function findSubmittedByCode(code: string): Promise<Group | undefined> {
  const normalized = (code ?? "").trim().toLowerCase();
  if (!normalized) return undefined;
  const groups = await listSubmittedGroups();
  return groups.find((g) => inviteCodeOf(g.link) === normalized);
}

export type AddGroupInput = {
  link: string;
  name?: string;
  image?: string;
  description?: string;
  category?: string;
  country?: string;
  language?: string;
  tags?: string[] | string;
};

export type AddGroupResult =
  | { ok: true; group: Group; code: string; path: string }
  | { ok: false; message: string; status: number };

function normalizeTags(tags: string[] | string | undefined): string[] | undefined {
  if (!tags) return undefined;
  const list = Array.isArray(tags)
    ? tags
    : tags.split(",").map((tag) => tag.trim());
  const cleaned = list.map((tag) => tag.trim()).filter(Boolean).slice(0, 10);
  return cleaned.length ? cleaned : undefined;
}

export async function addGroupToStore(input: AddGroupInput): Promise<AddGroupResult> {
  const canonical = joinUrl(input.link);
  if (!canonical) {
    return {
      ok: false,
      status: 400,
      message: "Only valid chat.whatsapp.com invite links are supported.",
    };
  }

  const code = inviteCodeOf(canonical);
  if (!code) {
    return { ok: false, status: 400, message: "Could not read the invite code." };
  }

  if (await isInviteReported(code)) {
    return {
      ok: false,
      status: 403,
      message: "This group link was reported and removed. It cannot be submitted again.",
    };
  }

  const existing = await findSubmittedByCode(code);
  if (existing) {
    return {
      ok: false,
      status: 409,
      message: "This group is already listed.",
    };
  }

  const now = Date.now();
  const name =
    (input.name ?? "").trim() ||
    `WhatsApp Group ${code.slice(0, 8)}`;
  const tags = normalizeTags(input.tags);
  const group: Group = {
    id: `u${now}`,
    name: name.slice(0, 80),
    image: input.image?.trim() || undefined,
    description: (input.description ?? "").trim(),
    platform: "whatsapp",
    category: (input.category ?? "").trim() || "all",
    members: 0,
    country: (input.country ?? "").trim(),
    ...(input.language?.trim() ? { language: input.language.trim() } : {}),
    ...(tags ? { tags } : {}),
    link: canonical,
    source: "user_submission",
    createdAt: new Date(now).toISOString(),
    status: "active",
  };

  const store = await readStore();
  store.groups = [group, ...store.groups.filter((g) => inviteCodeOf(g.link) !== code)];
  await writeStore(store);

  return {
    ok: true,
    group,
    code,
    path: `/group/invite/whatsapp/${code}`,
  };
}

export async function removeSubmittedByCode(code: string) {
  const normalized = (code ?? "").trim().toLowerCase();
  if (!normalized) return;
  const store = await readStore();
  store.groups = store.groups.filter((g) => inviteCodeOf(g.link) !== normalized);
  await writeStore(store);
}
