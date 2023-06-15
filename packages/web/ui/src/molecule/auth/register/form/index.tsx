import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@ui/atom";
import { useAuthRegister } from "@ustagil/web-state";
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
export interface AuthRegisterFormProps {}

type IFormValues = {
  email: string;
  password: string;
};

export const AuthRegisterForm: FC<AuthRegisterFormProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const authRegisterMutation = useAuthRegister({
    onSuccess: (_, variables) =>
      void router.push(
        `/auth/verify-email?${new URLSearchParams({
          email: variables.body.email,
        }).toString()}`
      ),
    onError: (_, variables) =>
      void router.push(
        `/auth/verify-email?${new URLSearchParams({
          email: variables.body.email,
        }).toString()}`
      ),
  });

  const onSubmit = handleSubmit((data) => {
    authRegisterMutation.mutate({
      body: data,
      params: {},
      query: {},
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <InputField
        className=""
        {...register("email")}
        label="E-Posta"
        placeholder=""
        type="email"
      />
      <InputField
        className="mt-3"
        {...register("password")}
        label="Parola"
        placeholder=""
        type="password"
        autoComplete="new-password"
      />
      <div className="flex mt-4 lg:justify-end">
        <div className="w-full lg:w-auto">
          <Button
            variant="contained"
            disabled={!isDirty && !isValid}
            loading={authRegisterMutation.isLoading}
            fullWidth
            title="Üye Ol"
          />
        </div>
      </div>
    </form>
  );
};

export default AuthRegisterForm;
