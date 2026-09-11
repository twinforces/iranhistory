import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { AuthorNoteView } from "../view/AuthorNoteView.tsx";

export const Route = createFileRoute("/note")({ component: Note });

function Note() {
  return (
    <AppShell current="/note">
      <AuthorNoteView />
    </AppShell>
  );
}
