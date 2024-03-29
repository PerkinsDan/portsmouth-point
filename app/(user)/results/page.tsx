"use client";
import { client } from "@/lib/sanity.client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { AuthorList } from "@/components/results/AuthorList";
import { PostList } from "@/components/results/PostList";
import { FilterButtons } from "@/components/results/FilterButtons";
import groq from "groq";

const queryPosts = groq`
        *[ _type == "post" && title match $words][0..20] {
            ...,
            author->,
            category->,
            "imageUrl": mainImage.asset->url,
        }
    `;

const queryAuthor = groq`
        *[ _type == "author" && name match $words][0..20] {
            name,
        }
    `;

export default function Page() {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

    const search = searchParams.get("search")?.trim().split(" ") || [""];
    const words = search.map((word) => `${word}*`);

    useEffect(() => {
        const getPosts = async () => {
            const posts = await client.fetch(queryPosts, { words });
            const authors = await client.fetch(queryAuthor, { words });
            setPosts(posts);
            setAuthors(authors);
            setIsLoaded(true);
        };

        getPosts();
    });

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    <>
        <h1>
            No results found for: <b>{search.join(" ")}</b>
        </h1>
    </>;
    return (
        <div className="max-w-2xl mx-auto">
            {posts.length > 0 && authors.length > 0 ? (
                <>
                    <h1>
                        Results for: <b>{search.join(" ")}</b>
                    </h1>
                    <FilterButtons filters={filters} setFilters={setFilters} />
                    {filters.length === 0 ? (
                        <>
                            <PostList posts={posts} />
                            <AuthorList authors={authors} />
                        </>
                    ) : (
                        <>
                            {filters.includes("posts") && (
                                <PostList posts={posts} />
                            )}
                            {filters.includes("authors") && (
                                <AuthorList authors={authors} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    {posts.length > 0 ? (
                        <PostList posts={posts} />
                    ) : (
                        <>
                            <h1>
                                No posts found for: <b>{search.join(" ")}</b>
                            </h1>
                        </>
                    )}
                    <hr />
                    {authors.length > 0 ? (
                        <AuthorList authors={authors} />
                    ) : (
                        <>
                            <h1>
                                No authors found for: <b>{search.join(" ")}</b>
                            </h1>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
