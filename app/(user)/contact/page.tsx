"use client";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Page = () => {
    const [copyState, setCopyState] = useState(false);

    function copyEmail() {
        setCopyState(true);
        setTimeout(() => setCopyState(false), 2000);
    }

    const contactEmail = "d.frampton@pgs.org.uk";

    return (
        <div>
            <main className="p-10 mx-auto mt-20 text-center border border-red-600 rounded w-fit">
                If you would like to contribute an article or ask a question
                about the blog please email the Editor, Dan Frampton:{" "}
                <CopyToClipboard onCopy={copyEmail} text={contactEmail}>
                    <button className="text-blue-600 hover:underline">
                        {contactEmail}
                    </button>
                </CopyToClipboard>
            </main>

            {copyState ? (
                <div className="absolute flex justify-center w-full bottom-20">
                    <p className="p-5 border border-gray-800 rounded">
                        Email copied to clipboard
                    </p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Page;
