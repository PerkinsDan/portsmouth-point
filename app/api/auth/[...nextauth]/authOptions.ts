import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            const userProfile = profile as GoogleProfile;
            if (account?.provider === "google") {
                return (
                    userProfile.email_verified &&
                    (userProfile.email.endsWith("@pgs.org.uk") ||
                        process.env.EMAIL_WHITELIST!.includes(
                            userProfile.email
                        ))
                );
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
    pages: {
        signIn: "/",
        error: "/", // Error code passed in query string as ?error=
    },
};
