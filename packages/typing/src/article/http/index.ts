export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./read";
export * from "./update";

export type ArticleHttpResponse = {
  _id: string;
  name: string;
};
