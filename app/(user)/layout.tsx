import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

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
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
