import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@ui/atom";
// import { useIntegrationsGet, useIntegrationsUpdate } from "@ustagil/web-state";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export interface IntegrationByIdEditSectionProps {
  id: string;
}

const schema = z.object({
  name: z.string().min(6),
});

type IFormValues = {
  name: string;
};

export const IntegrationByIdEditSection: FC<
  IntegrationByIdEditSectionProps
> = ({ id }) => {
  // const { data: integration, isSuccess } = useIntegrationsGet({
  //   variables: { params: { id }, query: {} },
  // });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      // name: integration?.datas.name ?? "",
    },
    resolver: zodResolver(schema),
  });

  // const integrationUpdateMutation = useIntegrationsUpdate({
  //   onSuccess: () => void router.push(`/integrations/${id}`),
  //   onError: () => void router.push(`/integrations/${id}`),
  // });

  const onSubmit = handleSubmit((data) => {
    // if (isSuccess) {
    //   integrationUpdateMutation.mutate({
    //     body: data,
    //     params: { id: integration?.datas.id },
    //   });
    // }
  });

  return (
    <Section id="integration-by-id-section">
      {/* {isSuccess && (
        <form onSubmit={onSubmit}>
          <InputField
            className="max-w-sm"
            {...register("name")}
            label="Name"
            placeholder=""
            type="name"
            autoComplete="name"
            error={errors.name?.message}
          />
          <div className="flex mt-4 lg:justify-end">
            <div className="w-full lg:w-auto">
              <Button
                variant="contained"
                disabled={
                  !isDirty || !isValid || integrationUpdateMutation.isLoading
                }
                fullWidth
                title="Update"
              />
            </div>
          </div>
        </form>
      )} */}
    </Section>
  );
};

export default IntegrationByIdEditSection;
