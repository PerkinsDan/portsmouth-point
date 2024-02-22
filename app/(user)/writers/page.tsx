import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
    *[ _type == "author" ] {
        ...,
    } | order(name asc)
`;

const sortWriters = (writers: Author[]) => {
    const sortedWriters: Author[][] = [];
    var currentLetter = writers[0].name[0];
    var currentList = [writers[0]];

    writers.shift();

    writers.forEach((writer) => {
        const { name } = writer;
        const firstLetter = name[0];

        if (firstLetter === currentLetter) {
            currentList.push(writer);
            return;
        }

        sortedWriters.push(currentList);
        currentList = [writer];
        currentLetter = firstLetter;
    });

    return sortedWriters;
};

export default async function Page() {
    const writers = await client.fetch<Author[]>(query);

    const sortedWriters = sortWriters(writers);

    return (
        <div className="max-w-2xl mx-5 md:mx-auto">
            <h1 className="text-2xl">Writers:</h1>
            {sortedWriters.map((writerList: any, index) => (
                <div key={index} className="py-2 border-b">
                    <h3 className="font-bold">{writerList[0].name[0]}</h3>
                    {writerList.map((writer: Author) => (
                        <a
                            className="hover:text-blue-600"
                            key={writer._id}
                            href={`/writers/${writer.name.replace(" ", "-")}`}
                        >
                            <h2>{writer.name}</h2>
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
}

export const revalidate = 10;
