import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { Key } from "react";
import { PortableText } from "@portabletext/react";

export default async function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
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
    *[ _type == "post" && slug == $slug ][0] 
    {
        ...,
        author->,
        category->,
        "imageUrl": mainImage.asset->url,
    }
    `;

    const post = await client.fetch(query, { slug });

    return (
        <div className="max-w-2xl mx-auto">
            <div>
                <h1 className="py-10 text-4xl font-bold">{post.title}</h1>
                <div className="flex justify-between px-5 ">
                    <div className="flex items-center gap-5">
                        <h3 className="text-xl underline">
                            {post.author.name}
                        </h3>
                        <h3>{post.publishedAt}</h3>
                    </div>
                    <h3 className="text-xl font-bold text-red-700">
                        {post.category.title}
                    </h3>
                </div>
                <div></div>
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    height={510}
                    width={680}
                    className="py-10"
                />
            </div>
            <div className="flex flex-col gap-5 break-words">
                <PortableText
                    value={post.body}
                    components={portableTextComponents}
                />
            </div>
        </div>
    );
}
