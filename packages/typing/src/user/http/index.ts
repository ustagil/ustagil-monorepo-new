export type UserListDto = {
  query: any;
};

export type UserReadDto = {
  query: any;
  params: { id: string };
};

export type UserCreateDto = {
  query: any;
  body: {
    username: string;
    password: string;
  };
};

export type UserUpdateDto = {
  params: { id: string };
  body: {
    username?: string;
    password?: string;
  };
};

export type UserDeleteDto = {
  params: { id: string };
};
