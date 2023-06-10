import { useState } from "react";
import { signin } from "../../service/sign";
import { tokenManager } from "../../util/tokenManager";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await signin(email, password);
    tokenManager.setToken(response.data.access_token);
  };

  return (
    <>
      <div className="bg-gray-200 w-[450px] rounded-3xl flex flex-col p-5 items-center">
        <h3 className="text-black text-2xl mb-3">" 로그인 페이지 "</h3>
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
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
            type="button"
            onClick={handleSubmit}
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
}
