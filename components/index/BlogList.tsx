import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { HeartIcon } from "@heroicons/react/24/outline";
import { GetDate } from "../GetDate";

type Props = {
    posts: Post[];
};

export const BlogList = ({ posts }: Props) => {
    return (
        <div className="grid gap-10 mx-auto my-10 xl:grid-cols-4 sm:grid-cols-2 w-max">
            {posts.map((post) => (
                <a
                    key={post._id}
                    className="w-64 h-64"
                    href={"/posts/" + post._id}
                >
                    <Image
                        className="object-cover w-full h-1/2"
                        src={urlFor(post.mainImage).url()}
                        height={170}
                        width={254}
                        alt={post.title}
                    />
                    <div className="flex flex-col justify-between py-2 h-1/2">
                        <div>
                            <h2 className="text-sm font-bold line-clamp-1">
                                {post.title}
                            </h2>
                            <p className="text-sm line-clamp-2">
                                {post.body[0].children[0].text}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mt-2 text-sm font-light">
                                    {post.author.name}
                                </p>
                                <div className="text-sm font-light">
                                    <GetDate date={post._createdAt} />
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center w-7 h-7">
                                <HeartIcon className="absolute text-gray-400 w-7 h-7" />
                                <p className="text-sm">{post.likes}</p>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};
