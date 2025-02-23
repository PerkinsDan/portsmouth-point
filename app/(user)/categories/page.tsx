import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
    *[ _type == "category" ] {
        ...,
    } | order(title asc)
`;

const sortCategories = (categories: Category[]) => {
    const groups: Record<string, Category[]> = {};

    categories.forEach((category: Category) => {
        const word = category.title;
        const firstLetter = word[0];

        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }

        groups[firstLetter].push(category);
    });

    return Object.values(groups);
};

export default async function Page() {
    const categories = await client.fetch<Category[]>(query);

    const sortedCategories = sortCategories(categories);

    return (
        <div className="max-w-2xl mx-5 md:mx-auto">
            <h1 className="text-2xl">Categories:</h1>
            {sortedCategories.map((categoryList: any, index) => (
                <div key={index} className="py-2 border-b">
                    <h3 className="font-bold">{categoryList[0].title[0]}</h3>
                    {categoryList.map((category: Category) => (
                        <a
                            className="hover:text-blue-600"
                            key={category._id}
                            href={`/categories/${category.title}`}
                        >
                            <h2>{category.title}</h2>
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
}

export const revalidate = 10;
