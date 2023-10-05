export const AuthorList = ({ authors }: { authors: Author[] }) => {
    return (
        <>
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
        </>
    );
};
