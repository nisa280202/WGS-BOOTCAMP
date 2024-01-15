import React from 'react'

const Navbar = () => {
    return (
        <div className="z-50 w-full top-0 flex flex-row justify-between px-10 py-6 text-white bg-gradient-to-r from-pink-500 to-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium text-center me-2 mb-2">
            <a href='/' className="text-md font-semibold">Contact App</a>
            <nav className="flex flex-row gap-5">
                {/* <a href='/contact' className="hover:cursor-pointer hover:text-red-500">Name</a> */}
            </nav>
        </div>
    )
}

export default Navbar