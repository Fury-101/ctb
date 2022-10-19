import Head from 'next/head'

export default () => {
    function back() { history.back(); return false }

    return <>
        <style jsx global>{`
            html, body{
                text-align: center;
                --tw-bg-opacity: 1;
                background-color: rgb(26 26 26 / var(--tw-bg-opacity));
                height: 100vh;
            }
        `}</style>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Busy Bees - About</title>
        </Head>
        
        <div className="absolute left-6 top-6">
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

        <div className='w-screen h-screen'>
            <p className='text-ctbaliengreen my-4 text-4xl font-bold '>
                ABOUT
            </p>
            <div className='w-3/4 h-3/4 mt-16 mx-auto rounded-lg bg-ctbaliengreen'>
                <p className='text-ctbgray text-xl my-4'>
                    Developed by <span className='font-semibold'>Vinay Singamsetty</span>
                    <br/>
                    @CTB 2022
                </p>
            </div>
        </div>
    </>
}