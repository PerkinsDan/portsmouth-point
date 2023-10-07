import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { LikeButton } from "@/components/posts/LikeButton";
import { PostBody } from "@/components/posts/PostBody";
import { GetDate } from "@/components/GetDate";
import { Loader } from "@/components/Loader";

const query = groq`
    *[ _type == "post" && _id == $slug ][0] 
    {
        ...,
        author->,
        category->,
        "imageUrl": mainImage.asset->url,
    }
    `;

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params: { slug } }: Props) {
    const post = await client.fetch(query, { slug });

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="pb-10">
                <h1 className="py-10 text-4xl font-bold">{post.title}</h1>
                <div className="flex justify-between px-5 ">
                    <div className="flex items-center gap-5">
                        <h3 className="text-xl underline">
                            {post.author.name}
                        </h3>
                        <GetDate date={post._createdAt} />
                    </div>
                    <h3 className="text-xl font-bold text-red-700">
                        {post.category.title}
                    </h3>
                </div>
                <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    height={510}
                    width={680}
                    className="py-10"
                    priority
                />
                <LikeButton postId={post._id} />
            </div>
            <PostBody body={post.body} />
        </div>
    );
}
