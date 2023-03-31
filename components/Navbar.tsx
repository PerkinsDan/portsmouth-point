"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const links = [
    { href: "/writers", label: "Writers" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "What's The Point?" },
];

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav className="flex flex-wrap justify-between items-center p-6 font-serif">
            <div className="flex items-center flex-shrink-0 mr-6">
                <Link href="/" className="text-lg font-bold hover:text-red-700">
                    PORTSMOUTH POINT
                </Link>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 rounded text-red-700"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>
            <div
                id="nav-links"
                className={
                    "w-full lg:flex lg:items-center lg:w-fit" +
                    (isExpanded ? " block" : " hidden")
                }
            >
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className="block mt-4 lg:inline-block lg:mt-0 mr-12 hover:text-red-700"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
