import type { Metadata } from "next";
import { MobileMenuPanel, MobileMenuProvider, MobileMenuShell } from "@/components/mobile-menu";
import { NavBar } from "@/components/sections/nav-bar";
import { bebasNeue, inter, spaceGrotesk, teko } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playmakers — The Inner Circle of Sports Tech",
  description:
    "A by-invitation private network for high growth sports tech founders and CEOs. Your peers. Your confidants. Your advantage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${teko.variable} ${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      {/* --k is what makes the page a scale drawing of the 1512 artboard.
          It needs two elements, not one: the body is the query container and
          the div reads it. A container cannot query itself. See globals.css. */}
      <body className="page-container min-h-full">
        {/* The drawer sits behind the page and the page slides off it, so the
            panel is a sibling of the shell rather than a child — inside it,
            `fixed` would resolve against the shell's transform. */}
        <MobileMenuProvider>
          <MobileMenuPanel />
          <MobileMenuShell nav={<NavBar />}>{children}</MobileMenuShell>
        </MobileMenuProvider>
      </body>
    </html>
  );
}
