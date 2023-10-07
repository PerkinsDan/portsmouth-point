import { Loader } from "@/components/Loader";

export const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader />
        </div>
    );
};
