import instance from "./instance";

export const signup = (email: string, password: string) =>
  instance.post("/auth/signup", { email: email, password: password });

export const signin = (email: string, password: string) =>
  instance.post("/auth/signin", { email: email, password: password });
