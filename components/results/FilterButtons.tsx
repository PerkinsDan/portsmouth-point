type Props = {
    filters: string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterButtons = ({ filters, setFilters }: Props) => {
    function handleClick(filter: string) {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        } else {
            setFilters(filters.filter((value) => value !== filter));
        }
    }

    const buttonEnabled = "text-green-500 border-green-500";
    const buttonDisabled = "text-black border-gray-300";

    return (
        <div className="flex gap-5">
            <h3 className="font-bold">Filters: </h3>
            <button
                className={`h-max px-1 text-sm border rounded-lg ${
                    filters.includes("posts") ? buttonEnabled : buttonDisabled
                }`}
                onClick={() => handleClick("posts")}
            >
                Posts
            </button>
            <button
                className={`h-max px-1 text-sm border rounded-lg ${
                    filters.includes("authors") ? buttonEnabled : buttonDisabled
                }`}
                onClick={() => handleClick("authors")}
            >
                Authors
            </button>
        </div>
    );
};
