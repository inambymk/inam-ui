import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "Inam UI - Premium React Component Library",
    template: "%s | Inam UI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Apply color theme before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('color-theme');
                  if (theme && theme !== 'cyan') {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
