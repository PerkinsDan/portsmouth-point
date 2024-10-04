import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
    *[ _type == "category" ] {
        ...,
    } | order(title asc)
`;

const sortCategories = (categories: Category[]) => {
    const sortedCategories: Category[][] = [];
    var currentLetter = categories[0].title[0];
    var currentList = [categories[0]];

    categories.shift();

    categories.forEach((category) => {
        const { title } = category;
        const firstLetter = title[0];

        if (firstLetter === currentLetter) {
            currentList.push(category);
        } else {
            sortedCategories.push(currentList);
            currentList = [category];
            currentLetter = firstLetter;
        }
    });

    return sortedCategories;
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
