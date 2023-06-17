export type Todo = { id: string; name: string };

export type TodoReadDto = {
  params: { id: string };
  query: Record<string, never>;
};

export type TodoListDto = {
  params: Record<string, never>;
  query: Record<string, never>;
};

export type TodoCreateDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: { name: string };
};

export type TodoUpdateDto = { params: { id: string }; body: { name?: string } };

export type TodoDeleteDto = { params: { id: string } };
