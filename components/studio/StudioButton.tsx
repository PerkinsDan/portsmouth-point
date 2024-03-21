import Image from "next/image";

const StudioButton = () => {
    return (
        <div className="sticky flex justify-end w-full bottom-10">
            <a
                href="/studio"
                className="p-5 mr-10 border rounded-full"
                target="_blank"
            >
                <Image
                    src="/pencil.svg"
                    height={30}
                    width={30}
                    alt="pencil button"
                />
            </a>
        </div>
    );
};

export default StudioButton;
