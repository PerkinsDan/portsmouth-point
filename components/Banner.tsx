import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Banner() {
    return (
        <div className=" flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-serif text-6xl text-red-700 font-semibold">
                Portsmouth Point
            </h1>
            <h3 className="font-serif my-8 font-semibold">
                The official blog of the{" "}
                <span className="underline underline-offset-2 decoration-2 decoration-red-700">
                    Portsmouth Point
                </span>
                <br /> PGS<span>&apos;</span>s magazine of ideas and culture
            </h3>
            <div >
                <MagnifyingGlassIcon className="h-5 w-5 absolute m-3" />
                <input type="search" className="border-2 border-black rounded-lg px-6 py-2 pl-10 md:w-[32em] flex focus:outline-none focus:border-red-700" />
            </div>
        </div>
    );
}

export default Banner;
