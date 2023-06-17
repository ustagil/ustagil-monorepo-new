export type User = { id: string; name: string };

export type UserReadDto = {
  params: { id: string };
  query: Record<string, never>;
};

export type UserListDto = {
  params: Record<string, never>;
  query: Record<string, never>;
};

export type UserCreateDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: { name: string };
};

export type UserUpdateDto = { params: { id: string }; body: { name?: string } };

export type UserDeleteDto = { params: { id: string } };
