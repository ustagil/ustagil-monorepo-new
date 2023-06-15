import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@ui/atom";
import { useAuthLogin } from "@ustagil/web-state";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../common/button";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthLoginFormProps {}

type IFormValues = {
  email: string;
  password: string;
};

export const AuthLoginForm: FC<AuthLoginFormProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const authLoginMutation = useAuthLogin({
    onSuccess: () => void router.push("/dashboard"),
    onError: () => void router.push("/dashboard"),
  });

  const onSubmit = handleSubmit((data: any) => {
    authLoginMutation.mutate({ body: data, params: {}, query: {} });
  });

  return (
    <form onSubmit={onSubmit}>
      <InputField
        {...register("email")}
        label="E-Posta"
        placeholder=""
        type="email"
        autoComplete="email"
        error={errors.email?.message}
      />
      <InputField
        className="mt-3"
        {...register("password")}
        label="Parola"
        placeholder=""
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
      />
      <div className="flex mt-4 lg:justify-end">
        <div className="w-full lg:w-auto">
          <Button
            variant="contained"
            disabled={!isDirty && !isValid}
            loading={authLoginMutation.isLoading}
            fullWidth
            title="Giriş Yap"
          />
        </div>
      </div>
    </form>
  );
};

export default AuthLoginForm;
