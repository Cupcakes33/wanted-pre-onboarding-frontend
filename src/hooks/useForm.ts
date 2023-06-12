import { useState, useEffect } from "react";

export default function useForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isValidate, setIsValidate] = useState(true);
  const [errorText, setErrorText] = useState({ email: "", password: "" });
  const [isTouched, setIsTouched] = useState({ email: false, password: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setErrorText({ email: "", password: "" });
    if (isTouched.email && (form.email === "@" || !form.email.includes("@"))) {
      setErrorText((prev) => ({
        ...prev,
        email: "Email 에는 @ 기호가 포함되어야 합니다.",
      }));
    }

    if (isTouched.password && form.password.length < 8) {
      setErrorText((prev) => ({
        ...prev,
        password: "password 는 8글자 이상이어야 합니다.",
      }));
    }
  }, [form]);

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

  return {
    form,
    handleChange,
    isValidate,
    errorText,
  };
}
