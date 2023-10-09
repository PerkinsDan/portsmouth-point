import Image from "next/image";
import { GetDate } from "@/components/GetDate";
import urlFor from "@/lib/urlFor";

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
                            <a
                                key={post._id}
                                className="w-full gap-5 pb-5 border-b"
                                href={"/posts/" + post._id}
                            >
                                <div className="flex justify-between pb-2">
                                    <h2 className="text-sm font-bold line-clamp-1">
                                        {post.title}
                                    </h2>
                                    <div className="text-right">
                                        <div className="text-sm font-light">
                                            <GetDate date={post._createdAt} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-64 aspect-video">
                                        <Image
                                            className="object-cover w-full h-full"
                                            src={urlFor(post.mainImage).url()}
                                            height={170}
                                            width={254}
                                            alt={post.title}
                                        />
                                    </div>
                                    <div className="text-sm w-fit">
                                        <p className="line-clamp-5">
                                            {post.body[0].children[0].text}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
