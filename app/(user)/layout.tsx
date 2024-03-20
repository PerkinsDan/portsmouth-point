import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import SignIn from "@/components/index/SignIn";
import Footer from "@/components/Footer";
import StudioButton from "@/components/studio/StudioButton";

export const metadata = {
    title: "Portsmouth Point",
    description: "The official website of Portsmouth Point magazine",
};

type Props = {
    children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "";

    return (
        <html lang="en">
            <body>
                <Navbar />

                {session ? <div>{children}</div> : <SignIn />}
                {process.env.ADMIN_LIST?.includes(email) && <StudioButton />}
                <Footer />
            </body>
        </html>
    );
}
