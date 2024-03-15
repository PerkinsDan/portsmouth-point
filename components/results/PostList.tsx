import Post from "./Post";

type Props = {
    posts: Post[];
};

export const PostList = ({ posts }: Props) => {
    return (
        <div>
            <h3 className="py-4 text-lg font-bold">Posts:</h3>
            <div className="flex flex-col max-w-2xl gap-10 mx-auto w-max">
                {posts.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    <>
                        {posts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
