import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — keep working bookmarks by sending them to /group/addgroup. */
export const Route = createFileRoute("/submit")({
  beforeLoad: () => {
    throw redirect({
      to: "/group/addgroup",
      statusCode: 301,
    });
  },
});
