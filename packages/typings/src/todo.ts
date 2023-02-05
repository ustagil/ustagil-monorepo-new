export type Todo = { name: string }

export type TodoGetDto = { params: { id: string }; query: {} }

export type TodoListDto = { params: {}; query: {} }

export type TodoCreateDto = { params: {}; query: {}; body: { name: string } }

export type TodoUpdateDto = { params: { id: string }; body: { name?: string } }

export type TodoDeleteDto = { params: { id: string } }
