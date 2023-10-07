import Image from "next/image";
import urlFor from "../../lib/urlFor";
import { PortableText } from "@portabletext/react";

const components = {
    types: {
        image: ({ value }: any) => (
            <Image
                src={urlFor(value.asset).url()}
                alt="post image"
                height={700}
                width={700}
            />
        ),
    },
    list: {
        // Ex. 1: customizing common list types
        bullet: ({ children }: any) => (
            <ul className="ml-10 list-disc">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="ml-10 list-decimal">{children}</ol>
        ),

        // Ex. 2: rendering custom lists
        checkmarks: ({ children }: any) => (
            <ol className="m-auto text-lg">{children}</ol>
        ),
    },
};

type Props = {
    body: Block[];
};

export const PostBody = ({ body }: Props) => {
    return (
        <div className="flex flex-col gap-5 break-words">
            <PortableText value={body} components={components} />
        </div>
    );
};
