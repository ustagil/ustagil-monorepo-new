export * from "./auth";
export * from "./integration";
export * from "./integration-email";
export * from "./invoice";
export * from "./todo";
export * from "./user";

export type APIResponse<T> = {
  datas: T;
  count: number;
};
