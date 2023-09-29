import Banner from "@/components/Banner";
import { BlogList } from "@/components/BlogList";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

const query = groq`
    *[ _type == "post" ] {
        ...,
        author->,
        categories[]->,
        "imageUrl": mainImage.asset->url,
    } | order(_createdAt desc)
    `;

async function HomePage() {
    const posts = await client.fetch(query);
    return (
        <div>
            <Banner />
            <BlogList posts={posts} />
        </div>
    );
}

export default HomePage;
