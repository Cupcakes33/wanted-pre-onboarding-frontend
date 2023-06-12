import { useEffect, useState } from "react";
import { TTodo } from "../../types/todo";
import { getTodos } from "../../service/todo";
import AddTodoForm from "../../components/ele/AddTodoForm";
import TodoItem from "../../components/ele/TodoItem";

export default function Todo() {
  const [todos, setTodos] = useState<TTodo[]>([]);
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

  return (
    <section className="flex flex-col w-1/2 p-2 overflow-hidden border h-1/2 rounded-xl">
      <AddTodoForm setTodos={setTodos} />
      <div className="overflow-y-auto">
        <ul className="flex flex-col w-full h-full gap-2">
          {todos?.map((item) => (
            <TodoItem
              key={item.id}
              editValue={editValue}
              isEdit={isEdit[item.id]}
              item={item}
              setEditValue={setEditValue}
              setIsEdit={setIsEdit}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
