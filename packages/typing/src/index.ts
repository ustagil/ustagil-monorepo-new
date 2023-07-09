export * from "./account";
export * from "./article";
export * from "./auth";
export * from "./membership";
export * from "./organization";
export * from "./todo";
export * from "./user";

export type APIResponse<T> = {
  datas: T;
  count: number;
};
