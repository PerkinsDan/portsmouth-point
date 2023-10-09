import { PostList } from "@/components/writers/PostList";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
    *[ _type == "post" && author->name == $writer ] {
        ...,
        category->,
        "imageUrl": mainImage.asset->url,
    } | order(_createdAt desc)
`;

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const writer = slug.replace("-", " ");

    const posts = await client.fetch<Post[]>(query, { writer });

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl underline">{writer}</h1>
            <PostList posts={posts} />
        </div>
    );
}
