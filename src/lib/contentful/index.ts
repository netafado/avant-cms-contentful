import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/lib/contentful/__generated/sdk";

if (!process.env.CONTENTFUL_GRAPHQL_ENDPOINT) {
  throw new Error("CONTENTFUL_GRAPHQL_ENDPOINT is not defined");
}

const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);
