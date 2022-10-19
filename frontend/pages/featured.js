import Head from 'next/head'
import { useSession } from "next-auth/react"

export default ({ businesses, types }) => {
    function back() { history.back(); return false }

    function tiles() {
        const list = [businesses.data[businesses.data.length * Math.random() | 0], businesses.data[businesses.data.length * Math.random() | 0]]
        if (list.length === 0) {
            return <h1 className="mx-6 mt-6 text-2xl font-semibold text-gray-600 text-center">
                No Suggested Businesses
            </h1>
        }

        
        return list.map(business => <a href={`/business/${business.id}`}>
                <div className="flex flex-row ml-8 mt-8">
                    <img
                        className="object-cover w-20 h-20 rounded-full"
                        src={`${process.env.strapiURL}${business.attributes.picture.data.attributes.url}`}
                    />
                    <h1 className="text-white mx-4 my-auto font-semibold text-2xl">
                        {business.attributes.name}
                    </h1>
                </div>
                <p className="mx-8 mt-4 text-gray-300 line-clamp-5 inline-block">
                    {business.attributes.description}
                </p>
                <div className="flex flex-row ml-8 mt-3 mr-auto">
                    {business.attributes.images?.data?.map(element=>
                        <img
                            className="mr-4 object-cover w-16 h-16 rounded-lg" 
                            key={element.id}
                            src={`${process.env.strapiURL}${element.attributes.url}`}
                        />
                    ).slice(0,3)}
                    <button className="px-2 py-2 my-auto mr-auto text-sm text-ctbgray font-semibold rounded-lg bg-ctbaliengreen">Learn More</button>
                </div>
            </a>
            )
    }

    return <>
        <style jsx global>{`
            body {
                --tw-bg-opacity: 1;
                background-color: rgb(26 26 26 / var(--tw-bg-opacity));
            }
        `}</style>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Busy Bees - Featured</title>
        </Head>
        <div className="mx-6 mt-6">
            {/* menu button */}

            <a className="z-10 text-white block" href="/menu">
                {/* <Image src = "/menu.png" width = "32" height = "32" className="-z-10 pointer-events-none text-left"/> */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </a>

            {/* back button */}
            <a href="#" onClick={back} className = "z-10 text-white w-max max-h-8 block">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            </a>
        </div>

        <h1 className="mx-6 mt-4 mb-8 text-3xl text-center font-semibold text-white">
            Featured Businesses
        </h1>

        {tiles()}

        {/* <div className="text-center">
            <button className="px-2.5 py-2.5 text-lg mt-28 text-ctbgray font-semibold rounded-xl bg-ctbaliengreen">
                Load more
            </button>
        </div> */}
    </>
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.strapiURL}/api/businesses?populate=*`)
    const businesses = await res.json()

    const r = await fetch(`${process.env.strapiURL}/api/categories`)
    const types = await r.json()

    return {
        props: {
            businesses,
            types
        }
    }
}