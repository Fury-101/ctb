// import { useState } from 'react';
// import Head from 'next/head'

// export default () => {
//     // const [files,setFiles] = useState()

//     const submit = async (e) => {
//         e.preventDefault();
        
//         const request = new XMLHttpRequest()

//         request.onreadystatechange = function() {
//             if (request.readyState == XMLHttpRequest.DONE) {
//                 console.log(request.responseText)
//             }
//         }

//         request.open('POST', `${process.env.strapiURL}/api/upload`)

//         const data = new FormData(e.target)
//         for (var p of data) console.log(p)
//         request.send(data)
//     }

//     return <>
//         <style jsx global>{`
//         html, body {
//             text-align: center;
//             --tw-bg-opacity: 1;
//             background-color: rgb(26 26 26 / var(--tw-bg-opacity));
//             height: 100%;
//         }

//         `}</style>
//         <Head>
//             <meta name="viewport" content="width=device-width, initial-scale=1" />
//             <title>Busy Bees</title>
//         </Head>

//         <form id = "form" onSubmit={submit}>
//             <input type="file" />
//             <input type="text" />
//             <input type="submit" value="Submit" />
//         </form>

//     </>
// }