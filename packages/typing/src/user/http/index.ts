export type UserListDto = {
  query: any;
};

export type UserReadDto = {
  query: any;
  params: { id: string };
};

export type UserCreateDto = {
  query: any;
  body: any;
};

export type UserUpdateDto = {
  params: { id: string };
  body: any;
};

export type UserDeleteDto = {
  params: { id: string };
};
