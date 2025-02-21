type Props = {
    date: string;
};

export const GetDate = ({ date }: Props) => {
    return <p>{new Date(date).toLocaleDateString("en-GB")}</p>;
};
