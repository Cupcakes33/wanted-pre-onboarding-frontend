import { useEffect, useRef, useState } from "react";
import { Todo as TTodo } from "../../types/todo";
import { createTodo, getTodos } from "../../service/todo";

export default function Todo() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getTodos().then((res) => console.log(res));
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
      setTodos((prev) => [...prev, res.data]);
      inputRef.current.value = ""
    } catch {}
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
        <li>
          <label>
            <input type="checkbox" />
            <input value="Todo 1" readOnly className="outline-none" />
          </label>
          <button>수정</button>
          <button>삭제</button>
        </li>
      </ul>
    </section>
  );
}
