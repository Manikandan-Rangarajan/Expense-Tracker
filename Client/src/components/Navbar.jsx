import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 bg-opacity-30 backdrop-blur-lg fixed top-0 left-0 w-full p-4 shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side (Jstore) */}
                <div className="text-orange-200 text-2xl font-bold flex justify-between items-center">
                    {/* <img src={" "}  alt="JokerPanda"  className='w-[50px] h-[50px] rounded-full hover:cursor-pointer '/> */}
                    <Link to="/" className="text-black hover:cursor-pointer hover:text-gray-400">ExpTrk</Link>
                </div>
                {/* Right side (Links) */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/home" className="text-black hover:cursor-pointer hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/expense" className="text-black hover:cursor-pointer hover:text-gray-400">Add Expense</Link>
                    </li>
                    <li>
                        <Link to="/history" className="text-black hover:cursor-pointer hover:text-gray-400">History</Link>
                    </li>
                    <li>
                        <Link to="/report" className="text-black hover:cursor-pointer hover:text-gray-400">Report</Link>
                    </li>
                    <li>
                        <Link to="/logout" className="text-black hover:cursor-pointer hover:text-gray-400">Logout</Link>
                    </li>
                    {/* <li>
                        <Link to="/sign-in" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Register</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;