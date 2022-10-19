import Image from 'next/image'
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"

export default () => {
    const { data: session } = useSession()

    return <>
        <style jsx global>{`
            body {
                text-align: center;
                --tw-bg-opacity: 1;
                background-color: rgb(26 26 26 / var(--tw-bg-opacity));
            }
        `}</style>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Busy Bees - Menu</title>
        </Head>
        <div className="-z-10 absolute h-screen w-screen">
            <a className="flex flex-column items-center w-full h-1/6 rounded-b-3xl bg-ctbgray text-4xl text-white text-center font-bold">
                <span className='text-center w-full'>
                    MENU
                </span>
            </a>
            <a href = "/featured" className="flex flex-column justify-center items-center h-1/6 rounded-b-3xl bg-[#5eee97] text-4xl text-black italic text-center font-bold">
                Featured
            </a>
            <a className="flex flex-column justify-center items-center h-1/6 rounded-b-3xl bg-[#52e18b] text-4xl text-black italic text-center font-bold">
                Display Request
            </a>
            <a href = "/search_businesses" className="flex flex-column justify-center items-center h-1/6 rounded-b-3xl bg-[#47c67a] text-4xl text-black italic text-center font-bold">
                Business List
            </a>
            <a className="flex flex-column justify-center items-center h-1/6 rounded-b-3xl bg-[#3cb86d] text-4xl text-black italic text-center font-bold">
                Favorites
            </a>
            <a href = "/search_education" className="flex flex-column justify-center items-center h-1/6 rounded-b-3xl bg-[#3ca465] text-4xl text-black italic text-center font-bold">
                Education
            </a>
        </div>
        <div className="-z-20 absolute h-screen w-screen">
            {/* <div class = "h-1/6 bg-ctbgray">
  </div> */}
            <div className="h-1/6 bg-[#5eee97]"></div>
            <div className="h-1/6 bg-[#52e18b]"></div>
            <div className="h-1/6 bg-[#47c67a]"></div>
            <div className="h-1/6 bg-[#3cb86d]"></div>
            <div className="h-1/6 bg-[#3ca465]"></div>
            <div className="h-1/6 bg-[#3ca465]"></div>
        </div>
    </>
}