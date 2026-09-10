import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { RailView } from "../view/RailView.tsx";

export const Route = createFileRoute("/rail")({ component: Rail });

function Rail() {
  return (
    <AppShell current="/rail">
      <RailView />
    </AppShell>
  );
}
