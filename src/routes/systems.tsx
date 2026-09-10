import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { SystemsView } from "../view/SystemsView.tsx";

export const Route = createFileRoute("/systems")({ component: Systems });

function Systems() {
  return (
    <AppShell current="/systems">
      <SystemsView />
    </AppShell>
  );
}
