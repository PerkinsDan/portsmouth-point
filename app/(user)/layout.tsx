import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/globals.css"
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { switchThemeDuration } from "@/app/constants";

export const metadata = {
    title: "Portsmouth Point",
    description: "The official website of Portsmouth Point magazine",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <style>{`.bg-slate-50 { background-color: slategray; }`}</style>
                <style>{`.dark { color: white; }`}</style>
            </head>
            <body className={`bg-slate-50 dark ${switchThemeDuration}`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ThemeSwitcher />
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}


