import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/providers";
import { inter, playfair, spaceGrotesk } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased grain-overlay">
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
