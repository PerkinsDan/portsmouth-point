import Image from "next/image";

const StudioButton = () => {
    return (
        <div className="fixed right-10 bottom-10">
            <a href="/studio" target="_blank">
                <div className="p-5 border rounded-full">
                    <Image
                        src="/pencil.svg"
                        height={30}
                        width={30}
                        alt="pencil button"
                    />
                </div>
            </a>
        </div>
    );
};

export default StudioButton;
