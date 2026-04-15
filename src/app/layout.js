import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterProvider from "@/components/ToasterProvider";
import { Providers } from "@/redux/Providers";
import AuthGuard from "@/components/AuthGuard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap", // 👈 Add this line
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased min-h-screen bg-layout dark:bg-none dark:bg-back`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider />
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
            <Providers>
              <AuthGuard>{children}</AuthGuard>
            </Providers>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
