import Image from 'next/image'
import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default ({ user }) => {
    function back() { history.back(); return false; }

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        if (typeof window === "undefined") return
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
        
        let textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }

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
            <title>Busy Bees - User</title>
        </Head>
        <div
            className="-z-10 bg-cover absolute w-screen h-24 bg-ctbgray"
            style={{
                backgroundImage: `url(${process.env.strapiURL}${user?.data.usersPermissionsUser.data.attributes.banner?.data?.attributes?.url ?? ""})`
            }}
        ></div>
        <div className="-z-10 bg-cover bg-gradient-to-r opacity-50 bg-black absolute w-screen h-24"></div>
        <div className="text-left absolute z-10 float-left mt-6 ml-4">
            {/* menu button */}

            <a className="z-10 text-white block" href="/menu">
                {/* <Image src = "/menu.png" width = "32" height = "32" className="-z-10 pointer-events-none text-left"/> */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </a>

            {/* back button */}
            <a href="#" onClick={back} className="z-10 text-white w-max max-h-8 block">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            </a>
        </div>
        <div className="m-auto left-0 right-0 text-center absolute">
            <img
                className="m-auto object-cover h-36 w-36 mt-6 rounded-full"
                src={`${process.env.strapiURL}${user?.data.usersPermissionsUser.data.attributes.profile?.data?.attributes?.url ?? ""}`}
            />
            <h1 className="mt-4 text-white font-semibold text-3xl">{user.data.usersPermissionsUser.data.attributes?.full_name ?? ""}</h1>
            <div className="mt-2 mb-1 flex justify-center">
                {/* star button */}
                <svg
                    className="px-1 py-1 w-8 h-8"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
                {/* share button */}
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
                                        Copied to Clipboard
                                    </Dialog.Title>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>

                <button onClick = {openModal}>
                    <svg
                        className="px-1 py-1 w-8 h-8"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                </button>
                {/* more button */}
                <svg
                    className="px-1 py-1 w-8 h-8"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                </svg>
            </div>
            <p className="w-2/3 mx-auto text-lg font-light text-left block text-gray-100">
                {user.data.usersPermissionsUser.data.attributes?.description ?? ""}
            </p>
        </div>
    </>
}

export async function getServerSideProps({ params }) {
    const query = 
    `query {
        usersPermissionsUser(id: ${params.uid}) {
            data {
                id
                attributes {
                    username
                    email
                    description
                    profile {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    banner {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    full_name
                }
            }
        }
    }`
    const res = await fetch(`${process.env.strapiURL}/graphql?query=` + query)
    const user = await res.json()

    return {
        props: {
            user
        }
    }
}