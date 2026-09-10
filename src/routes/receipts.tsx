import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { ReceiptsView } from "../view/ReceiptsView.tsx";

export const Route = createFileRoute("/receipts")({ component: Receipts });

function Receipts() {
  return (
    <AppShell current="/receipts">
      <ReceiptsView />
    </AppShell>
  );
}
