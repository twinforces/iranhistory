import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { DesignView } from "../view/DesignView.tsx";

export const Route = createFileRoute("/design")({ component: Design });

function Design() {
  return (
    <AppShell current="/design">
      <DesignView />
    </AppShell>
  );
}
