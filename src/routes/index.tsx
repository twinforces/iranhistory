import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { HomeView } from "../view/HomeView.tsx";
import { RailPending } from "../view/RailPending.tsx";

export const Route = createFileRoute("/")({
  pendingComponent: RailPending,
  pendingMs: 0,
  component: Home,
});

function Home() {
  return (
    <AppShell current="/">
      <HomeView />
    </AppShell>
  );
}
