import React from 'react'

const Navbar = () => {
    return (
        <div className="z-50 w-full top-0 flex flex-row justify-between px-10 py-6 bg-red-100">
            <a href='/' className="text-lg hover:cursor-pointer hover:text-red-500">Nisa's App</a>
            <nav className="flex flex-row gap-5">
                <a href='/contact' className="hover:cursor-pointer hover:text-red-500">Name</a>
                <a href='/image' className="hover:cursor-pointer hover:text-red-500">Image</a>
                <a href='/video' className="hover:cursor-pointer hover:text-red-500">Video</a>
                <a href='/comment' className="hover:cursor-pointer hover:text-red-500">Comment</a>
                <a href='/clock' className="hover:cursor-pointer hover:text-red-500">Clock</a>
                <a href='/hooks' className="hover:cursor-pointer hover:text-red-500">Hooks</a>
            </nav>
        </div>
    )
}

export default Navbar