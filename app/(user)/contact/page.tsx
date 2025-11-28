import CopyToClipboard from "@/components/CopyToClipboard";

const Page = () => {
    return (
        <div>
            <main className="p-5 mx-auto mt-20 text-center border border-red-600 rounded w-fit">
                If you would like to contribute an article or ask a question
                about the blog please email the Editors, J Digby (
                <CopyToClipboard text={"j.digby@pgs.org.uk"} />) and A
                Waterhouse: (
                <CopyToClipboard text={"a.waterhouse@pgs.org.uk"} />)
            </main>
        </div>
    );
};

export default Page;
