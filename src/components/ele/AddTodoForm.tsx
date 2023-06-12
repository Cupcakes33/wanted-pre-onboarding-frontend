import React, { Dispatch, SetStateAction, useRef } from "react";
import { createTodo } from "../../service/todo";
import { TTodo } from "../../types/todo";

type Props = {
  setTodos: Dispatch<SetStateAction<TTodo[]>>;
};

export default function AddTodoForm({ setTodos }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      return;
    }
    try {
      const payload = {
        todo: inputValue,
        isCompleted: false,
      };
      const res = await createTodo(payload);
      if (res.status === 201) {
        setTodos((prev) => [...prev, res.data]);
        inputRef.current.value = "";
      } else {
        alert("Todo 작성에 실패했습니다.");
      }
    } catch (error) {
      alert("Todo 작성에 실패했습니다.");
    }
  };
  return (
    <form
      className="w-full h-[40px] flex flex-row gap-2 mb-2"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="p-3 rounded-lg outline-none basis-4/5 bg-slate-300"
        data-testid="new-todo-input"
      />
      <button
        className="bg-red-100 rounded-lg basis-1/5"
        data-testid="new-todo-add-button"
      >
        Add
      </button>
    </form>
  );
}
