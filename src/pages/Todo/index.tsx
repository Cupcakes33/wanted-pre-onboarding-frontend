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
  const [isEdit, setIsEdit] = useState<{ [key: number]: boolean }>({});
  const [editValue, setEditValue] = useState<{ [key: number]: string }>({});

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

  const handleUpdate = async ({ id, isCompleted }: TTodo) => {
    const payload = {
      todo: editValue[id],
      isCompleted: isCompleted,
    };
    try {
      const res = await updateTodo(id, payload);
      if (res.status === 200) {
        setTodos((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
        setIsEdit((prev) => ({ ...prev, [id]: false }));
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

  const handleUpdateStart = (item: TTodo) => {
    setIsEdit((prev) => ({ ...prev, [item.id]: true }));
    setEditValue((prev) => ({ ...prev, [item.id]: item.todo }));
  };

  const handleCancel = (item: TTodo) => {
    setIsEdit((prev) => ({ ...prev, [item.id]: false }));
    setEditValue((prev) => ({ ...prev, [item.id]: item.todo }));
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
              <input
                value={isEdit[item.id] ? editValue[item.id] : item.todo}
                readOnly={!isEdit[item.id]}
                onChange={(e) => {
                  setEditValue((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }));
                }}
                className="outline-none"
              />
            </label>
            {isEdit[item.id] ? (
              <>
                <button onClick={() => handleUpdate(item)}>제출</button>
                <button onClick={() => handleCancel(item)}>취소</button>
              </>
            ) : (
              <>
                <button onClick={() => handleUpdateStart(item)}>수정</button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
