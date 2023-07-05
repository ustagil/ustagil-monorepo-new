export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./read";
export * from "./update";

export type TodoHttpResponse = {
  _id: string;
  name: string;
};
