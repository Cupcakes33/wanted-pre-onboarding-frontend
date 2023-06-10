import { useEffect, useState } from "react";
import { signup } from "../../service/sign";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isValidate, setIsValidate] = useState(true);
  const [errorText, setErrorText] = useState({ email: "", password: "" });
  const [isTouched, setIsTouched] = useState({ email: false, password: false });

  const navigate = useNavigate();
  const { email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(email, password)
      .then((res) => res.status === 201 && navigate("/signin"))
      .catch();
  };

  useEffect(() => {
    setErrorText({ email: "", password: "" });
    if (isTouched.email && (email === "@" || !email.includes("@"))) {
      setErrorText((prev) => ({
        ...prev,
        email: "Email 에는 @ 기호가 포함되어야 합니다.",
      }));
    }

    if (isTouched.password && password.length < 8) {
      setErrorText((prev) => ({
        ...prev,
        password: "password 는 8글자 이상이어야 합니다.",
      }));
    }
  }, [email, password]);

  useEffect(() => {
    if (
      isTouched.email &&
      isTouched.password &&
      errorText.email === "" &&
      errorText.password === ""
    ) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [errorText]);

  return (
    <>
      <div className="bg-gray-200 w-[450px] rounded-3xl flex flex-col p-5 items-center">
        <h3 className="text-black text-2xl mb-3">" 회원가입 페이지 "</h3>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              name="email"
              className="w-full h-10 rounded-3xl px-5"
              data-testid="email-input"
              onChange={handleChange}
              value={form.email}
            />
            {errorText.email && (
              <p className="text-xs mt-1 ml-5 font-bold">{errorText.email}</p>
            )}
          </div>
          <div>
            <input
              name="password"
              type="password"
              className="w-full h-10 rounded-3xl px-5"
              data-testid="password-input"
              onChange={handleChange}
              value={form.password}
            />
            {errorText.password && (
              <p className="text-xs mt-1 ml-5 font-bold">
                {errorText.password}
              </p>
            )}
          </div>
          <button
            className="w-full h-10 bg-black text-white rounded-3xl transition-all disabled:opacity-30"
            data-testid="signup-button"
            disabled={isValidate}
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}
