import { defineField, defineType } from "sanity";
import { generateRandomSlug } from "@/lib/generateRandomSlug";

export default defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "string",
            initialValue: generateRandomSlug(),
            hidden: true,
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: { type: "author" },
        }),
        defineField({
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: { type: "category" },
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "date",
            initialValue: new Date().toLocaleDateString("sv-SE"), // sv-SE matches the format of Sanity's date picker
            hidden: true,
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "blockContent",
        }),
    ],

    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
});
