import Banner from "@/components/Banner";
import { BlogList } from "@/components/BlogList";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

async function HomePage() {
    const revalidate = 10;
    const query = groq`
    *[ _type == "post" ] {
        ...,
        author->,
        categories[]->,
        "imageUrl": mainImage.asset->url,
    } | order(_createdAt desc)
    `;
    const posts = await client.fetch(query, { next: { revalidate } });
    return (
        <div>
            <Banner />
            <BlogList posts={posts} />
        </div>
    );
}

export default HomePage;

export const revalidate = 10;
