import { authLogin, authRegister, authVerifyEmail } from "@ustagil/api";
import { AxiosError } from "axios";
// import { useStoreSnacks } from '@ustagil/state';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  AuthVerifyEmailDto,
} from "@ustagil/typings";
import { setCookie } from "nookies";
import { createMutation } from "react-query-kit";

export const useAuthLogin = createMutation<
  AuthResponse,
  AuthLoginDto,
  AxiosError
>({
  mutationKey: ["auth", "login"],
  mutationFn: async (variables) => await authLogin(variables),
  onSuccess(data) {
    setCookie(null, "accessToken", data.accessToken, {
      maxAge: 14 * 24 * 60 * 60,
      path: "/",
    });
  },
  // onError: console.error,
  // void enqueueSnack({
  //   message: 'Giriş yapılamadı. Email veya şifre yanlış.',
  //   variant: 'error',
  // }),
});

export const useAuthRegister = createMutation<
  AuthResponse,
  AuthRegisterDto,
  AxiosError
>({
  mutationKey: ["auth", "register"],
  mutationFn: async (variables) => await authRegister(variables),
  onSuccess(data) {
    setCookie(null, "accessToken", data.accessToken, {
      maxAge: 14 * 24 * 60 * 60,
      path: "/",
    });
  },
  // onError: console.error,
  // void enqueueSnack({
  //   message: 'Giriş yapılamadı. Email veya şifre yanlış.',
  //   variant: 'error',
  // }),
});

export const useAuthVerifyEmail = createMutation<
  AuthResponse,
  AuthVerifyEmailDto,
  AxiosError
>({
  mutationKey: ["auth", "verify", "email"],
  mutationFn: async (variables) => await authVerifyEmail(variables),
});
