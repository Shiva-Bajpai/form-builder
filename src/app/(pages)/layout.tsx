import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { UserProvider } from "@/store/userStore";
import { getSession } from "@/actions/getSession";
import SetSession from "@/components/SetSession";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeerList Forms",
  description: "",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          {user?.status === 429 ? (
            <p className="p-4">{user?.error}</p>
          ) : (
            <main className="w-full h-screen  md:overflow-hidden max-sm:px-0 max-lg:px-0  max-md:px-0 max-xs:px-0 max-xl:px-0 max-2xl:px-24 grid-cols-1 grid md:grid-cols-4 items-center justify-center">
              <SetSession user={user} />
              {children}
            </main>
          )}
        </UserProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "white",
              borderRadius: "14px",
              fontSize: "0.75rem",
              padding: "11px 16px",
            },
            className: "w-fit right-0",
          }}
        />
      </body>
    </html>
  );
}
