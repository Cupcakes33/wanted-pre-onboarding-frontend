import { Dispatch, SetStateAction } from "react";
import { TTodo } from "../../types/todo";
import { deleteTodo, updateTodo } from "../../service/todo";

type Props = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
  setEditValue: Dispatch<SetStateAction<{ [key: number]: string }>>;
  editValue: { [key: number]: string };
  setTodos: Dispatch<SetStateAction<TTodo[]>>;
  item: TTodo;
};

export default function TodoControls({
  isEdit,
  setIsEdit,
  editValue,
  setEditValue,
  setTodos,
  item,
}: Props) {
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
  return (
    <>
      {isEdit ? (
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
    </>
  );
}
