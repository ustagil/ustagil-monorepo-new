import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  AuthVerifyEmailDto,
} from '@acme/typings'
import { axiosInstance } from '@acme/utils'

export const authLogin = async ({ body }: AuthLoginDto) =>
  (await axiosInstance.post<AuthResponse>(`auth/login`, body)).data

export const authRegister = async ({ body }: AuthRegisterDto) =>
  (await axiosInstance.post<AuthResponse>(`auth/register`, body)).data

export const authVerifyEmail = async ({ body }: AuthVerifyEmailDto) =>
  (await axiosInstance.post<AuthResponse>(`auth/verify-email`, body)).data
