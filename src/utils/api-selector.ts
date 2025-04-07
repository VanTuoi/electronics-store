import { privateApi, publicApi } from "~/services/http";

/**
 * @param type client is api used in next, server is backend api
 * @returns
 */
export function getApi(type: "public" | "private" = "public") {
    return type === "public" ? publicApi : privateApi;
}
