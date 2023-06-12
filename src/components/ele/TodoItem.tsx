import { Dispatch, SetStateAction } from "react";
import { TTodo } from "../../types/todo";
import { updateTodo } from "../../service/todo";
import TodoControls from "./TodoControls";

type Props = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
  setEditValue: Dispatch<SetStateAction<{ [key: number]: string }>>;
  editValue: { [key: number]: string };
  setTodos: Dispatch<SetStateAction<TTodo[]>>;
  item: TTodo;
};

export default function TodoItem({
  isEdit,
  setIsEdit,
  editValue,
  setEditValue,
  setTodos,
  item,
}: Props) {
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
  return (
    <li key={item.id} className="flex flex-row items-center justify-between">
      <label className="flex basis-4/5">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => handleCompleted(item)}
          className="mr-2"
        />
        <input
          value={isEdit ? editValue[item.id] : item.todo}
          readOnly={!isEdit}
          onChange={(e) => {
            setEditValue((prev) => ({
              ...prev,
              [item.id]: e.target.value,
            }));
          }}
          className={`w-full outline-none ${isEdit ? "border" : ""}`}
        />
      </label>
      <div>
        <TodoControls
          setTodos={setTodos}
          setIsEdit={setIsEdit}
          setEditValue={setEditValue}
          editValue={editValue}
          isEdit={isEdit}
          item={item}
        />
      </div>
    </li>
  );
}
