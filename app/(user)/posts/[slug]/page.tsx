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

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const post = await client.fetch<Post>(query, { slug });

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    const { title, body, _createdAt, author, category, mainImage } = post;
    const imageUrl = urlFor(mainImage).url();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="pb-10">
                <h1 className="py-10 text-4xl font-bold">{title}</h1>
                <div className="flex justify-between px-5 ">
                    <div className="flex items-center gap-5">
                        <a
                            className="text-xl underline"
                            href={`/writers/${author.name.replace(" ", "-")}`}
                        >
                            {author.name}
                        </a>
                        <div className="pr-4 border-r-2 border-black">
                            <GetDate date={_createdAt} />
                        </div>
                        <p>Likes: {post.likes}</p>
                    </div>
                    <h3 className="text-xl font-bold text-red-700">
                        {category.title}
                    </h3>
                </div>
                <Image
                    src={imageUrl}
                    alt={title}
                    height={510}
                    width={680}
                    className="py-10"
                    priority
                />
                <LikeButton postId={slug} />
            </div>
            <PostBody body={body} />
        </div>
    );
}

export async function generateStaticParams() {
    const slugQuery = groq`
        *[ _type == "post" ] {
            _id
        } 
    `;

    const posts = await client.fetch<Post[]>(slugQuery);

    return posts.map((post) => ({
        slug: post._id,
    }));
}

export const revalidate = 10;
