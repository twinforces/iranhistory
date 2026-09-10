import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { HomeView } from "../view/HomeView.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell current="/">
      <HomeView />
    </AppShell>
  );
}
