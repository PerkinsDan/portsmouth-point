import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { HeartIcon } from "@heroicons/react/24/outline";
import { GetDate } from "../GetDate";

type Props = {
    posts: Post[];
};

export const BlogList = ({ posts }: Props) => {
    return (
        <div className="grid grid-cols-4 gap-5 mx-auto my-20 w-max">

            {posts.map((post) => (
                <a
                    key={post._id}
                    className="w-64 h-64 rounded-lg p-3 bg-gray-800 bg-opacity-50"
                    href={"/posts/" + post._id}
                >
                    <Image
                        className="object-cover w-full h-1/2 rounded-lg"
                        src={urlFor(post.mainImage).url()}
                        height={170}
                        width={254}
                        alt={post.title}
                    />
                    <div className="py-2">
                        <h2 className="text-sm font-bold line-clamp-1">
                            {post.title}
                        </h2>
                        <p className="text-sm line-clamp-2">
                            {post.body[0].children[0].text}
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mt-2 text-sm font-light">
                                    {post.author.name}
                                </p>
                                <div className="text-sm font-light">
                                    <GetDate date={post._createdAt} />
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center">
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
