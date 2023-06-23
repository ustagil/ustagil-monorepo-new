export type TodoListDto = {
  query: any;
};

export type TodoReadDto = {
  query: any;
  params: { id: string };
};

export type TodoCreateDto = {
  query: any;
  body: any;
};

export type TodoUpdateDto = {
  params: { id: string };
  body: any;
};

export type TodoDeleteDto = {
  params: { id: string };
};
