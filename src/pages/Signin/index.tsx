import { useState } from "react";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(form);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <div className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
        <div className="bg-gray-200 w-[450px] h-[300px] rounded-3xl">
          <form
            className="flex flex-col p-5 gap-3 h-full justify-center"
            onSubmit={handleSubmit}
          >
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
      </div>
    </>
  );
}
