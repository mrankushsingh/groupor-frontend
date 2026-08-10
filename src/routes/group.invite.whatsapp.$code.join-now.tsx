import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL → /group/rules/whatsapp/$code */
export const Route = createFileRoute("/group/invite/whatsapp/$code/join-now")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/group/rules/whatsapp/$code",
      params: { code: params.code },
      replace: true,
    });
  },
});
