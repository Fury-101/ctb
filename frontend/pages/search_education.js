import { Fragment, useState } from 'react'
import Head from 'next/head'
import { Dialog, Transition } from '@headlessui/react'

export default ({ lessons }) => {

    function back() { history.back(); return false; }

    const [list, setList] = useState(lessons.data)

    function search(event) {
        event.preventDefault()

        const inp = document.getElementById("searchbar").value.toLowerCase()

        const tokens = inp.split(' ').filter(token => token.trim() !== '')

        const regex = new RegExp(tokens.join('|'), 'gim')

        setList(lessons.data.filter(lesson => {
            //lesson name & description

            const lessonStr = lesson.attributes.name.toLowerCase().trim()
                + ' ' + lesson.attributes.description.toLowerCase().trim()

            return lessonStr.match(regex)
        }))
    }

    function tiles() {
        if (list.length == 0)
            return <h1 className="mx-6 mt-6 text-2xl font-semibold text-gray-600 text-center">
                No Search Matches
            </h1>
        else {
            return list.map(lesson => {console.log(lesson); return <a href={`${lesson.attributes.link}`} className="flex flex-row content-center ml-8 mt-6">
                <img
                    className="object-cover w-28 h-28 rounded-xl"
                    src={`${process.env.strapiURL}${lesson.attributes.display_image.data.attributes.url}`}
                />
                <div>
                    <h1 className="text-white mx-4 my-2.75 font-semibold text-xl">
                        {lesson.attributes.name}
                    </h1>
                    <p className="mx-4 text-gray-300 line-clamp-2 inline-block">
                        {lesson.attributes.description}
                    </p>
                </div>
            </a>}
            )
        }
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
            <title>Busy Bees - Search Businesses</title>
        </Head>
        <div className="flex flex-row justify-center w-screen pt-3 px-3">
            {/* menu button */}

            <a className="z-10 text-white block" href="/menu">
                {/* <Image src = "/menu.png" width = "32" height = "32" className="-z-10 pointer-events-none text-left"/> */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </a>
            <form className='flex flex-row grow' onSubmit={search}>
                {/* search bar */}
                <input
                    type="search"
                    className="mx-1 px-3 py-1.5 grow text-lg rounded-full form-control relative"
                    placeholder="Search for businesses..."
                    id="searchbar"
                />
                {/* search icon (btn) */}
                <button
                    className="text-white font-medium rounded shadow-md items-center"
                    type="submit"
                    id="button-addon2"
                >
                    <svg
                        focusable="false"
                        data-prefix="fas"
                        data-icon="search"
                        className="w-8 h-8"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        />
                    </svg>
                </button>
            </form>
        </div>

        <div className='flex flex-row pt-1 px-3'>
            {/* back button */}
            <a href="#" onClick={back} className="z-10 text-white w-max max-h-8 inline-block">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            </a>
        </div>

        <h1 className="mx-6 mt-6 text-2xl font-semibold text-white">
            Search Results
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
    const res = await fetch(`${process.env.strapiURL}/api/educations?populate=*`)
    const lessons = await res.json()

    return {
        props: {
            lessons,
        }
    }
}