import { Fragment, useState } from 'react'
import Head from 'next/head'
import { Dialog, Transition } from '@headlessui/react'

export default ({ businesses, types }) => {
    function back() { history.back(); return false; }

    const [list, setList] = useState(businesses.data)
    const [listTags, setTags] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        if (typeof window === "undefined") return
        setIsOpen(false)
        const val = document.getElementById("tagselect").value;

        if (val.length > 0 && !listTags.includes(document.getElementById("tagselect").value))
            listTags.push(val)
        console.log(listTags)
    }
    
    function removeTag(tag) {
        setTags(listTags.filter(e => e !== tag))
    }

    function openModal() {
        setIsOpen(true)
    }

    function search(event) {
        event.preventDefault()

        const inp = document.getElementById("searchbar").value.toLowerCase()

        const tokens = inp.split(' ').filter(token => token.trim() !== '')

        const regex = new RegExp(tokens.join('|'), 'gim')

        let filteredList = [];

        if (listTags.length>0) {
            for (const business of businesses.data) {
                for (const tag of listTags) {
                    for (const bTag of business.attributes.categories.data) {
                        if (bTag.attributes.name === tag)
                            filteredList.push(business);
                    }
                }
            }
        } else {
            filteredList = businesses.data
        }

        if (inp)
            setList(filteredList.filter(business => {
                //go through owner description & name
                //business name & description
                
                console.log(business)
                const businessStr = business.attributes.name.toLowerCase().trim()
                    + ' ' + business.attributes.description.toLowerCase().trim()
                    + ' ' + business.attributes.user.data.attributes.full_name.toLowerCase().trim()
                    + ' ' + business.attributes.user.data.attributes.description.toLowerCase().trim()

                return businessStr.match(regex)
            }))
        else
            setList(filteredList)
    }

    function tiles() {
        if (list.length == 0)
            return <h1 className="mx-6 mt-6 text-2xl font-semibold text-gray-600 text-center">
                No Search Matches
            </h1>
        else {
            for (let business of list)
                return <a href={`/business/${business.id}`} className="flex flex-row content-center ml-8 mt-6">
                    <img
                        className="object-cover w-28 h-28 rounded-xl"
                        src={`${process.env.strapiURL}${business.attributes.picture.data.attributes.url}`}
                    />
                    <div>
                        <h1 className="text-white mx-4 my-2.75 font-semibold text-xl">
                            {business.attributes.name}
                        </h1>
                        <p className="mx-4 text-gray-300 line-clamp-2 inline-block">
                            {business.attributes.description}
                        </p>
                    </div>
                </a>
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
            {/* search tags */}

            {listTags.map(tag => <div key = {tag} className="bg-white rounded-full text-gray-400 inline-block mt-auto mb-0.5 px-1 mx-1">
                <span className="text-sm">{tag}</span>
                <button onClick={() => {removeTag(tag)}}>
                    <svg
                        className="inline-block w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>)}

            {/* filter modal*/}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add Filter Tags
                                </Dialog.Title>

                                <p><label>Tag:
                                    <select id = "tagselect">
                                        <option></option>
                                        {types.data.map(type =>
                                            <option key={type.attributes.name}>{type.attributes.name}</option>
                                        )}
                                    </select>
                                </label></p>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <button onClick={openModal} className='ml-auto'>
                <svg className="w-8 h-8 ml-auto inline-block text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            </button>
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
