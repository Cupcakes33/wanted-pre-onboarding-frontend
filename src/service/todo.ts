import instance from "./instance";

export const getTodos = () => instance.get("/todos");

export const createTodo = (payload: { todo: string; isCompleted: boolean }) =>
  instance.post("/todos", payload);



export const updateTodo = (
  id: number,
  payload: { todo: string; isCompleted: boolean }
) => instance.put(`/todos/${id}`, payload);

export const deleteTodo = (id: number) => instance.delete(`/todos/${id}`);
