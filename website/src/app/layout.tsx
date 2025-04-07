import type { Metadata } from "next";
import { Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  description:
    "Automatically adds id attributes to your HTML/JSX/TSX components for improved testing and QA processes.",
  metadataBase: new URL("https://idomatic.dev"),
  keywords: [
    "Idomatic",
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
  generator: "Idomatic CLI",
  applicationName: "Idomatic",
  appleWebApp: {
    title: "Idomatic",
  },
  title: {
    default: "Idomatic – Automatic ID Injection CLI",
    template: "%s | Idomatic",
  },
  openGraph: {
    url: "./",
    siteName: "Idomatic",
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
  <Banner dismissible={false}>🚀 IDomatic is live – check it out now!</Banner>
);
const navbar = (
  <Navbar
    className="max-w-7xl!"
    logoLink="/"
    logo={
      <p className="text-white text-xl font-semibold tracking-tight no-underline">
        <span className="text-red-600">#</span>IDomatic
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
      </body>
    </html>
  );
};

export default RootLayout;
