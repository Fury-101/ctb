import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.strapiURL}/api/auth/local`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        identifier: credentials.username,
                        password: credentials.password
                    })
                })

                const user = await res.json()
                if (user.error)
                    throw user.error.message

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user)
                token.user = user

            return token
        },
        async session({ session, token, user }) {
            if (user)
                session.user = user
            if (token)
                session.token = token
            
            return session
        },
    },
    debug: true
};

const Auth = (req, res) =>
    NextAuth(req, res, options);

export default Auth; 