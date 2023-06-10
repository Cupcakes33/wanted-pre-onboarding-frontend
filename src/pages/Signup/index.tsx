import { useState } from "react";
import { signup } from "../../service/sign";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(email, password).then((res) => console.log(res));
  };

  return (
    <>
      <div className="bg-gray-200 w-[450px] rounded-3xl flex flex-col p-5 items-center">
        <h3 className="text-black text-2xl mb-3">" 회원가입 페이지 "</h3>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <input
            name="email"
            className="w-full h-10 rounded-3xl px-5"
            data-testid="email-input"
            onChange={handleChange}
            value={form.email}
          />
          <input
            name="password"
            type="password"
            className="w-full h-10 rounded-3xl px-5"
            data-testid="password-input"
            onChange={handleChange}
            value={form.password}
          />
          <button
            className="w-full h-10 bg-black text-white rounded-3xl"
            data-testid="signup-button"
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}
