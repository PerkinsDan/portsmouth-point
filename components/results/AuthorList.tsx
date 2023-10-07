type Props = {
    authors: Author[];
};

export const AuthorList = ({ authors }: Props) => {
    return (
        <div>
            <h3 className="py-4 text-lg font-bold">Authors:</h3>
            {authors.length === 0 ? (
                <p>No results found</p>
            ) : (
                <div>
                    <ul>
                        {authors.map((author) => (
                            <li key={author._id}>{author.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
