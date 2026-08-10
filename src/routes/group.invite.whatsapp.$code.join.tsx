import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL → /group/join/whatsapp/$code */
export const Route = createFileRoute("/group/invite/whatsapp/$code/join")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/group/join/whatsapp/$code",
      params: { code: params.code },
      replace: true,
    });
  },
});
