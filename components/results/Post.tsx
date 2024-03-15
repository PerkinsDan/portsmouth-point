"use client";
import Image from "next/image";
import { GetDate } from "@/components/GetDate";
import urlFor from "@/lib/urlFor";
import { toPlainText } from "@portabletext/react";
import { useState } from "react";

type Props = {
    post: Post;
};

const Post = ({ post }: Props) => {
    const [hover, setHover] = useState(false);
    return (
        <a
            key={post._id}
            className="w-full pb-5 border-b"
            href={"/posts/" + post._id}
        >
            <div className="flex justify-between mb-2">
                <h2 className="text-sm font-bold line-clamp-1">{post.title}</h2>
                <div
                    className="flex gap-5 text-right"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {!hover ? (
                        <p className="text-sm font-light">{post.author.name}</p>
                    ) : (
                        <div className="text-sm font-light">
                            <GetDate date={post._createdAt} />
                        </div>
                    )}
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
                    <p className="line-clamp-5">{toPlainText(post.body)}</p>
                </div>
            </div>
        </a>
    );
};

export default Post;
