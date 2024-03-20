import Image from "next/image";
import { GetDate } from "@/components/GetDate";
import urlFor from "@/lib/urlFor";
import { toPlainText } from "@portabletext/react";

type Props = {
    post: Post;
};

const Post = ({ post }: Props) => {
    return (
        <a
            key={post._id}
            className="w-full pb-5 border-b"
            href={"/posts/" + post._id}
        >
            <div className="flex justify-between mb-1">
                <h2 className="text-sm font-bold line-clamp-1">{post.title}</h2>
                <div className="flex gap-5 text-right">
                    <p className="text-sm font-light">{post.author.name}</p>
                </div>
            </div>
            <div className="flex justify-between mb-2 text-sm font-light">
                <div className="flex gap-2">
                    Published: <GetDate date={post._createdAt} />
                </div>
                <p>Likes: {post.likes}</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <Image
                    className="object-cover w-full aspect-video"
                    src={urlFor(post.mainImage).url() || ""}
                    height={170}
                    width={254}
                    alt={post.title}
                />
                <div className="w-full col-span-2 text-sm">
                    <p className="line-clamp-6">{toPlainText(post.body)}</p>
                </div>
            </div>
        </a>
    );
};

export default Post;
