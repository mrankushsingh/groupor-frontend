import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/group/invite/whatsapp/$code")({
  component: () => <Outlet />,
});
