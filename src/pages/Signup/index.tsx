import { alertText } from "../../helpers/alertText";
import useForm from "../../hooks/useForm";
import { signup } from "../../service/sign";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { form, handleChange, isValidate, errorText } = useForm();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(form.email, form.password)
      .then((res) => res.status === 201 && navigate("/signin"))
      .catch(() => alert(alertText.SIGNUP[400]));
  };

  return (
    <>
      <div className="bg-gray-200 w-[450px] rounded-3xl flex flex-col p-5 items-center">
        <h3 className="text-black text-2xl mb-3">" 회원가입 페이지 "</h3>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div>
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
