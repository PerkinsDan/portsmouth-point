"use client";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";

export const LikeButton = ({ postId }: { postId: string }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Check if the post has already been liked in this session
        const hasLiked = localStorage.getItem("likedPostId") === postId;
        setLiked(hasLiked);
    }, [postId]);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);

            client.patch(postId).inc({ likes: 1 }).commit();

            localStorage.setItem("likedPostId", postId);
        }
    };

    return (
        <div className="flex items-center justify-between px-4 py-2 border rounded">
            <h3>Enjoyed this post?</h3>
            <button
                onClick={handleLike}
                className={`
                border px-2 py-1 rounded-lg
                ${
                    liked
                        ? "text-green-500 border-green-500"
                        : "text-black border border-black"
                }
                `}
            >
                {liked ? "Liked" : "Like"}
            </button>
        </div>
    );
};
