export * from "./article";
export * from "./auth";
export * from "./todo";
export * from "./user";

export type APIResponse<T> = {
  datas: T;
  count: number;
};
