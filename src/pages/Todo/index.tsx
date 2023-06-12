import { useEffect, useRef, useState } from "react";
import { TTodo } from "../../types/todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../service/todo";

export default function Todo() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    (async () => {
      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch (error) {
        alert("데이터를 불러오지 못했습니다.");
      }
    })();
  }, []);

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
  const handleCompleted = async ({ id, todo, isCompleted }: TTodo) => {
    const payload = {
      todo: todo,
      isCompleted: !isCompleted,
    };
    try {
      const res = await updateTodo(id, payload);
      if (res.status === 200) {
        setTodos((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
      } else {
        alert("Todo 수정에 실패했습니다.");
      }
    } catch {
      alert("Todo 수정에 실패했습니다.");
    }
  };

  const handleUpdate = async ({ id, todo, isCompleted }: TTodo) => {
    const payload = {
      todo: todo,
      isCompleted: isCompleted,
    };
    try {
      const res = await updateTodo(id, payload);
      if (res.status === 200) {
        setTodos((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
      } else {
        alert("Todo 수정에 실패했습니다.");
      }
    } catch {
      alert("Todo 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteTodo(id);
      if (res.status === 204) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } else {
        alert("Todo 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("Todo 삭제에 실패했습니다.");
    }
  };

  return (
    <section className="w-1/2 p-2 border rounded-xl h-1/2">
      {/* input area */}
      <form
        className="w-full h-[40px] flex flex-row gap-2"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="p-3 rounded-lg outline-none basis-4/5 bg-slate-300"
        />
        <button className="bg-red-100 rounded-lg basis-1/5">Add</button>
      </form>

      {/* view area */}

      <ul>
        {todos?.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCompleted(item)}
              />
              <input value={item.todo} readOnly className="outline-none" />
            </label>
            <button onClick={() => handleUpdate(item)}>수정</button>
            <button
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
