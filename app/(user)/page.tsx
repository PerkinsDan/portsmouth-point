import Banner from "@/components/index/Banner";
import { BlogList } from "@/components/index/BlogList";
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
    const posts = await client.fetch<Post[]>(query);

    return (
        <div>
            <Banner />
            <BlogList posts={posts} />
        </div>
    );
}

export default HomePage;

export const revalidate = 10;
