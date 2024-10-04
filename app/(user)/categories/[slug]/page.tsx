import { PostList } from "@/components/results/PostList";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
    *[ _type == "post" && category->title == $category ] {
        ...,
        author->,
        category->,
        "imageUrl": mainImage.asset->url,
    } | order(_createdAt desc)
`;

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const category = slug.replaceAll("%20", " ").replaceAll("%26", "&");

    const posts = await client.fetch<Post[]>(query, { category });

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl underline">{category}</h1>
            <PostList posts={posts} />
        </div>
    );
}
