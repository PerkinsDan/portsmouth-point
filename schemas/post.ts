import { defineField, defineType } from "sanity";

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
            name: "body",
            title: "Body",
            type: "blockContent",
        }),
        defineField({
            name: "likes",
            title: "Likes",
            type: "number",
            initialValue: 0,
            hidden: true,
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
