"use client";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { LikeButton } from "@/components/LikeButton";
import { useEffect, useState } from "react";

export default function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const [post, setPost] = useState<Post>();
    const portableTextComponents = {
        types: {
            image: ({ value }: any) => (
                <Image
                    src={urlFor(value.asset).url()}
                    alt="post image"
                    height={700}
                    width={700}
                />
            ),
        },
        list: {
            // Ex. 1: customizing common list types
            bullet: ({ children }: any) => (
                <ul className="ml-10 list-disc">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol className="ml-10 list-decimal">{children}</ol>
            ),

            // Ex. 2: rendering custom lists
            checkmarks: ({ children }: any) => (
                <ol className="m-auto text-lg">{children}</ol>
            ),
        },
    };
    const query = groq`
    *[ _type == "post" && _id == $slug ][0] 
    {
        ...,
        author->,
        category->,
        "imageUrl": mainImage.asset->url,
    }
    `;

    useEffect(() => {
        const getPost = async () => {
            const data = await client.fetch(query, { slug });
            setPost(data);
        };

        getPost();
    }, [slug, query]);

    return (
        <>
            {post ? (
                <div className="max-w-2xl mx-auto">
                    <div className="pb-10">
                        <h1 className="py-10 text-4xl font-bold">
                            {post.title}
                        </h1>
                        <div className="flex justify-between px-5 ">
                            <div className="flex items-center gap-5">
                                <h3 className="text-xl underline">
                                    {post.author.name}
                                </h3>
                                <h3>
                                    {new Date(
                                        post._createdAt
                                    ).toLocaleDateString()}
                                </h3>
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
                        />
                        <LikeButton postId={post._id} />
                    </div>
                    <div className="flex flex-col gap-5 break-words">
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
}
