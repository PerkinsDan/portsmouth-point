"use client";
import { useState } from "react";

type Props = {
    text: string;
};

const CopyToClipboard = ({ text }: Props) => {
    const [copyState, setCopyState] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);

    const handleClick = async () => {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                setCopyState(true);
                setTimeout(() => setCopyState(false), 2000);
            } catch {
                setCopyFailed(true);
                setTimeout(() => setCopyFailed(false), 2000);
            }
        } else {
            console.warn("Clipboard API not supported");
            setCopyFailed(true);
            setTimeout(() => setCopyFailed(false), 2000);
        }
    };

    return (
        <>
            <a onClick={handleClick} className="text-blue-600 hover:underline">
                {text}
            </a>
            {copyState ? (
                <div className="absolute flex justify-center w-full bottom-20">
                    <p className="p-5 border border-green-600 rounded">
                        Email copied to clipboard
                    </p>
                </div>
            ) : (
                <></>
            )}
            {copyFailed ? (
                <div className="absolute flex justify-center w-full bottom-20">
                    <p className="p-5 border border-red-800 rounded">
                        Email failed to copy to clipboard
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default CopyToClipboard;
