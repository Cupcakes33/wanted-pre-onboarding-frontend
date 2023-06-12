import { Todo, TodoId, TodoPayload } from "../types/todo";
import instance from "./instance";

export const createTodo = (payload: TodoPayload) =>
  instance.post("/todos", payload);

export const getTodos = () => instance.get("/todos");

// export const updateTodo = (id, todo, isCompleted) =>
//   instance.put(`/todos/${id}`, { email: email, password: password });

export const deleteTodo = (id: number) => instance.delete(`/todos/${id}`);
