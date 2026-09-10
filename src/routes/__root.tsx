import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { HydrateMark } from "../view/HydrateMark.tsx";
import { RailPending } from "../view/RailPending.tsx";
import appCss from "../styles.css?url";

const APP_NAME = "Train Ride to War";

export const Route = createRootRoute({
  pendingComponent: RailPending,
  pendingMs: 0,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "A toxic-incentives briefing on US-Iran history. You sit the chair. The rail is already written. A GrumpyTechBro joint.",
      },
      { name: "theme-color", content: "#100e0c" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Serif:ital,wght@0,500;0,600;1,500&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html:not(.hydrated) .rail-boot{position:fixed;inset:0;z-index:60;display:grid;place-items:center;background:#100e0c;color:#ede6d8}html.hydrated .rail-boot{display:none}',
          }}
        />
      </head>
      <body>
        <div className="rail-boot" role="status" aria-live="polite">
          <div className="rail-boot-inner">
            <p className="kicker">Train Ride to War</p>
            <p className="rail-boot-title">Loading the rail</p>
            <p className="rail-boot-copy">The briefing is still coming down the wire.</p>
          </div>
        </div>
        <HydrateMark />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
