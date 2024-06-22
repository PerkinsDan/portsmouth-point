import Image from "next/image";
const Page = () => {
    return (
        <div>
            <main className="max-w-2xl mx-auto">
                <h1 className="py-10 text-4xl font-bold">
                    What&apos;s The Point?
                </h1>
                <p>
                    Portsmouth Point blog offers Portsmouth Grammar School
                    pupils, former pupils, parents and staff a daily forum for
                    sharing ideas, opinions and enthusiasms. Whether exploring
                    politics, music, film, sport, literature, science,
                    photography, religion, history, philosophy or countless
                    other topics, the blog offers something new and
                    thought-provoking to read every day.
                </p>
                <br></br>
                <p>
                    The blog was launched in February 2012, first designed by{" "}
                    <b>Daniel Rollins</b>, redesigned by <b>Daniel Perkins</b>{" "}
                    and edited by <b>Dan Frampton</b>.
                </p>
                <Image
                    src="/portsmouthmag-cover.jpg"
                    alt="Portsmouth Point Magazine Cover"
                    width={500}
                    height={1000}
                    className="mx-auto my-20 "
                />
            </main>
        </div>
    );
};

export default Page;
