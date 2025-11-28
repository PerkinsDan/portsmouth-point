import { client } from "./sanity.client";
import {
    createImageUrlBuilder,
    type SanityImageSource,
} from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export default urlFor;
