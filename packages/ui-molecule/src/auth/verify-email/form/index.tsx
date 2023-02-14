import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthVerifyEmail } from "@ustagil/state";
import { InputField } from "@ustagil/ui-atom";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../common/button";

const schema = z.object({
  verifyCode: z.string().min(6),
});

export interface AuthVerifyEmailFormProps {}

type IFormValues = {
  verifyCode: string;
};

export const AuthVerifyEmailForm: FC<AuthVerifyEmailFormProps> = () => {
  const router = useRouter();
  const { email } = router.query;
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      verifyCode: "",
    },
    resolver: zodResolver(schema),
  });

  const authVerifyEmailMutation = useAuthVerifyEmail({
    onSuccess: () => void router.push("/dashboard"),
    onError: () => void router.push("/dashboard"),
  });

  const onSubmit = handleSubmit((data) => {
    if (typeof email !== "string") return;

    authVerifyEmailMutation.mutate({
      body: { ...data, email },
      params: {},
      query: {},
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <InputField
        className="mt-3"
        {...register("verifyCode")}
        label="Verify Code"
        placeholder=""
        type=""
      />
      <div className="flex mt-4 lg:justify-end">
        <div className="w-full lg:w-auto">
          <Button
            variant="contained"
            disabled={!isDirty || !isValid}
            loading={authVerifyEmailMutation.isLoading}
            fullWidth
            title="Verify"
          />
        </div>
      </div>
    </form>
  );
};

export default AuthVerifyEmailForm;
