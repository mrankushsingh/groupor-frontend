import { createFileRoute, redirect } from "@tanstack/react-router";
import { GroupDetail, GroupNotFound } from "@/components/GroupDetail";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { categories, findGroupBySlug, groupSlug, inviteCodeOf } from "@/data/groups";

export const Route = createFileRoute("/category/$slug_/$group")({
  loader: ({ params }) => {
    const group = findGroupBySlug(params.slug, params.group) ?? null;
    // Legacy URL: the canonical group page now lives at /group/invite/whatsapp/<code>.
    const code = group ? inviteCodeOf(group.link) : "";
    if (code) {
      throw redirect({
        to: "/group/invite/whatsapp/$code",
        params: { code },
        statusCode: 301,
      });
    }
    const categorySlug = group?.category ?? params.slug;
    const category = categories.find((c) => c.slug === categorySlug);
    return { group, categoryName: category?.name ?? categorySlug, params };
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: LegacyGroupPage,
});

function LegacyGroupPage() {
  const { group: staticGroup, categoryName, params } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const group = staticGroup ?? submitted.find((g) => groupSlug(g) === params.group) ?? null;

  if (!group) return <GroupNotFound />;

  const name =
    categoryName || categories.find((c) => c.slug === group.category)?.name || group.category;

  return <GroupDetail group={group} categoryName={name} />;
}
