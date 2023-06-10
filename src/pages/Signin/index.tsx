import { signin } from "../../service/sign";
import { tokenManager } from "../../util/tokenManager";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { alertText } from "../../helpers/alertText";

export default function Signin() {
  const navigate = useNavigate();
  const { form, handleChange, isValidate, errorText } = useForm();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signin(form.email, form.password)
      .then((res) => {
        if (res.status === 200) {
          tokenManager.setToken(res.data.access_token);
          navigate("/todo");
        }
      })
      .catch((error) => {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            alert(alertText.SIGNIN[401]);
            break;
          case 404:
            alert(alertText.SIGNIN[404]);
            break;
          default:
            alert(alertText.SIGNIN.else);
        }
      });
  };

  return (
    <>
      <div className="bg-gray-200 w-[450px] rounded-3xl flex flex-col p-5 items-center">
        <h3 className="text-black text-2xl mb-3">" 로그인 페이지 "</h3>
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
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
            data-testid="signin-button"
            disabled={isValidate}
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
}
