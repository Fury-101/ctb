import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"

export default () => {
    const { data: session } = useSession()

    function notIn() {
        if (session)
            return false

        return <>
            <button onClick={() => signIn()}
                className="px-3 py-3 mt-4 text-center mb-auto text-2xl text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                Sign In
            </button>
            <br />
            <a href='/menu'>
                <button
                    className="px-3 py-3 mt-4 text-center mb-auto text-2xl text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                    Continue as Guest
                </button>
            </a>
        </>
    }
    
    function signedIn() {
        if (!session)
            return false
        
        return <>
            <button onClick = {() => signOut()}
                className="px-3 py-3 my-4 text-center mb-auto text-2xl text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                Log Out
            </button>
            <br/>
            <a href='/menu'>
                <button
                    className="px-3 py-3 my-4 text-center mb-auto text-2xl text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                    Continue
                </button>
            </a>
        </>
    }

    return <>
        <style jsx global>{`
        html, body {
            text-align: center;
            --tw-bg-opacity: 1;
            background-color: rgb(26 26 26 / var(--tw-bg-opacity));
            height: 100%;
        }

        `}</style>
        <div className='m-auto my-auto'>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Busy Bees</title>
            </Head>
            <img
                className="mx-auto w-2/3"
                src="/Busy_B_green.png"
            />
        </div>
        <p className="text-center mt-28 text-gray-600 font-bold w-2/3 mx-auto p-4 text-lg">
            {session ? `Signed in as ${session.token.user.user?.full_name}` : "Not signed in"}
        </p>
        {signedIn()}
        {notIn()}

        <a href='/about' className='fixed bottom-8 left-auto right-auto left-1/2 -translate-x-1/2'>
            <button
                className="px-3 py-3 mt-auto text-center text-2xl text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                About
            </button>
        </a>
    </>
}