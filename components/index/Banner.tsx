"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Banner = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col items-center justify-center px-6 text-center ">
            <h1 className="font-serif text-6xl font-semibold text-red-700">
                Portsmouth Point
            </h1>
            <h3 className="my-8 font-serif font-semibold">
                The official blog of the{" "}
                <span className="underline underline-offset-2 decoration-2 decoration-red-700">
                    Portsmouth Point
                </span>
                <br /> PGS<span>&apos;</span>s magazine of ideas and culture
            </h3>
            <div>
                <MagnifyingGlassIcon className="absolute w-5 h-5 m-3" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push(`/results?search=${search}`);
                    }}
                >
                    <input
                        type="search"
                        className="border-2 border-black rounded-lg px-6 py-2 pl-10 md:w-[32em] flex focus:outline-none focus:border-red-700"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Banner;
