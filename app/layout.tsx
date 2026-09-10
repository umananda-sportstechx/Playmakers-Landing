import type { Metadata } from "next";
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
