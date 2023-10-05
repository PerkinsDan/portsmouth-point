"use client";
import { client } from "@/lib/sanity.client";
import { useSearchParams } from "next/navigation";
import SearchList from "@/components/SearchList";
import { useEffect, useState } from "react";
import { AuthorList } from "@/components/AuthorList";

const queryPosts = `
        *[ _type == "post" && title match $words][0..20] {
            ...,
            author->,
            category->,
            "imageUrl": mainImage.asset->url,
        }
    `;

const queryAuthor = `
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

    const search = searchParams.get("search")?.split(" ") || [""];
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
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    console.log(filters);

    return (
        <div className="max-w-2xl mx-auto">
            {posts.length === 0 && authors.length === 0 ? (
                <>
                    <h1>
                        No results found for: <b>{search.join(" ")}</b>
                    </h1>
                </>
            ) : (
                <>
                    <h1>
                        Results for: <b>{search.join(" ")}</b>
                    </h1>
                    <div className="flex gap-5">
                        <h3 className="font-bold">Filters: </h3>
                        <button
                            className={`h-max px-1 text-sm border rounded-lg ${
                                filters.includes("posts")
                                    ? "text-green-500 border-green-500"
                                    : "text-black border-gray-300"
                            }`}
                            onClick={() => {
                                if (!filters.includes("posts")) {
                                    setFilters([...filters, "posts"]);
                                } else {
                                    setFilters(
                                        filters.filter(
                                            (value) => value !== "posts"
                                        )
                                    );
                                }
                            }}
                        >
                            Posts
                        </button>
                        <button
                            className={`h-max px-1 text-sm border rounded-lg ${
                                filters.includes("authors")
                                    ? "text-green-500 border-green-500"
                                    : "text-black border-gray-300"
                            }`}
                            onClick={() => {
                                if (!filters.includes("authors")) {
                                    setFilters([...filters, "authors"]);
                                } else {
                                    setFilters(
                                        filters.filter(
                                            (value) => value !== "authors"
                                        )
                                    );
                                }
                            }}
                        >
                            Authors
                        </button>
                    </div>

                    {filters.length === 0 ? (
                        <>
                            <h3 className="py-4 text-lg font-bold">Posts:</h3>
                            <SearchList posts={posts} />
                            <h3 className="py-4 text-lg font-bold">Authors:</h3>
                            <AuthorList authors={authors} />
                        </>
                    ) : (
                        <>
                            {filters.includes("posts") && (
                                <>
                                    <h3 className="py-4 text-lg font-bold">
                                        Posts:
                                    </h3>
                                    <SearchList posts={posts} />
                                </>
                            )}
                            {filters.includes("authors") && (
                                <>
                                    <h3 className="py-4 text-lg font-bold">
                                        Authors:
                                    </h3>
                                    <AuthorList authors={authors} />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
