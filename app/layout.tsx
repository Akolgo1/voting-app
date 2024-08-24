import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "@/components/nav/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/QueryProvider";
import { getUrl } from "@/lib/utils";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(getUrl()),

	title: {
		template: "%s | Daily Vote",
		default: "Daily Vote",
	},
	authors: {
		name: "chensokheng",
	},

	description:
		"Cast your vote now and see live updates on the poll results, powered by the real-time capabilities of Supabase database integration in our web app",
	openGraph: {
		title: "Daily Vote",
		description:
			"Cast your vote now and see live updates on the poll results, powered by the real-time capabilities of Supabase database integration in our web app.",
		url: getUrl(),
		siteName: "Daily Vote",
		images: "/og.png",
		type: "website",
	},
	keywords: ["daily votes", "akolgo"],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} bg-[#09090B] text-gray-200 antialiased  py-10`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<main className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-10 p-5">
							<Navbar />
							<div className="w-full flex-1 ">{children}</div>
							<Footer />
						</main>
					</QueryProvider>

					<Toaster position="top-center" reverseOrder={false} />
				</ThemeProvider>
			</body>
		</html>
	);
}
