import Image from "next/image";
import urlFor from "@/lib/urlFor";

type Props = {
    posts: Post[];
};

export const BlogList = ({ posts }: Props) => {
    return (
        <div className="grid grid-cols-4 gap-10 mx-auto my-20 w-max">
            {posts.map((post) => (
                <div key={post._id} className="w-64 h-64">
                    <Image
                        className="object-cover w-full h-1/2"
                        src={urlFor(post.mainImage).url()}
                        height={170}
                        width={254}
                        alt={post.description}
                    />
                    <div className="py-2">
                        <h2 className="text-sm font-bold line-clamp-1">
                            {post.title}
                        </h2>
                        <p className="text-sm line-clamp-2">
                            {post.body[0].children[0].text}
                        </p>
                        <p className="mt-2 text-sm font-light">
                            {post.author.name}
                        </p>
                        <p className="text-sm font-light">
                            {new Date(post._createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
