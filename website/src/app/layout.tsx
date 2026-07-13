import type { Metadata } from "next";
import { Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  description:
    "Automatically adds id attributes to your HTML/JSX/TSX components for improved testing and QA processes.",
  metadataBase: new URL("https://idomatic.dev"),
  keywords: [
    "idomatic",
    "CLI",
    "HTML",
    "JSX",
    "TSX",
    "React",
    "Vue",
    "Angular",
    "ID Injection",
    "Testing",
    "QA",
    "Automation",
  ],
  generator: "idomatic CLI",
  applicationName: "idomatic",
  appleWebApp: {
    title: "idomatic",
  },
  title: {
    default: "idomatic – Automatic ID Injection CLI",
    template: "%s | idomatic",
  },
  openGraph: {
    url: "./",
    siteName: "idomatic",
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://idomatic.dev",
  },
  alternates: {
    canonical: "./",
  },
};

const banner = (
  <Banner dismissible={false}>
    🚀 idomatic adds stable, readable id attributes so your tests stop breaking.
  </Banner>
);
const navbar = (
  <Navbar
    className="max-w-7xl!"
    logoLink="/"
    logo={
      <p className="text-white text-xl font-semibold tracking-tight no-underline">
        <span className="text-red-600">#</span>idomatic
      </p>
    }
    projectLink="https://github.com/AmarSmajlovic/idomatic"
  />
);

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/AmarSmajlovic/idomatic/blob/main/website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={<Footer />}
        >
          {children}
        </Layout>
        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
