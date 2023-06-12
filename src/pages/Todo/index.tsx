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
    <section className="flex flex-col w-1/2 p-2 overflow-hidden border h-1/2 rounded-xl">
      {/* input area */}
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

      {/* view area */}
      <div className="overflow-y-auto">
        <ul className="flex flex-col w-full h-full gap-2">
          {todos?.map((item) => (
            <li
              key={item.id}
              className="flex flex-row items-center justify-between"
            >
              <label className="flex basis-4/5">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCompleted(item)}
                  className="mr-2"
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
                  className={`w-full outline-none ${
                    isEdit[item.id] ? "border" : ""
                  }`}
                />
              </label>
              <div>
                {isEdit[item.id] ? (
                  <>
                    <button
                      className="px-2 py-1 mr-2 bg-red-100 rounded-lg"
                      onClick={() => handleUpdate(item)}
                      data-testid="submit-button"
                    >
                      제출
                    </button>
                    <button
                      className="px-2 py-1 bg-red-100 rounded-lg"
                      onClick={() => handleCancel(item)}
                      data-testid="cancel-button"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-2 py-1 mr-2 bg-red-100 rounded-lg"
                      onClick={() => handleUpdateStart(item)}
                      data-testid="modify-button"
                    >
                      수정
                    </button>
                    <button
                      className="px-2 py-1 bg-red-100 rounded-lg"
                      onClick={() => handleDelete(item.id)}
                      data-testid="delete-button"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
