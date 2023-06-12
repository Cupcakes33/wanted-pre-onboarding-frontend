export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: string;
};

export type TodoId = Pick<Todo, "id">;
export type TodoPayload = Pick<Todo, "todo"> & Pick<Todo, "isCompleted">;
