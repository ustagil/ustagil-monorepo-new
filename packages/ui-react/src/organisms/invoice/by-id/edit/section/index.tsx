import { zodResolver } from "@hookform/resolvers/zod";
import { useInvoicesGet, useInvoicesUpdate } from "@ustagil/state";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputField } from "../../../../../atoms/form/input-field";
import { Section } from "../../../../../atoms/section";
import { Button } from "../../../../../molecules/common/button";

export interface InvoiceByIdEditSectionProps {
  id: string;
}

const schema = z.object({
  billingPlanName: z.string().min(6),
});

type IFormValues = {
  billingPlanName: string;
};

export const InvoiceByIdEditSection: FC<InvoiceByIdEditSectionProps> = ({
  id,
}) => {
  const { data: invoice, isSuccess } = useInvoicesGet({
    variables: { params: { id }, query: {} },
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      billingPlanName: invoice?.datas.billingPlanName ?? "",
    },
    resolver: zodResolver(schema),
  });

  const invoiceUpdateMutation = useInvoicesUpdate({
    onSuccess: () => void router.push(`/invoices/${id}`),
    onError: () => void router.push(`/invoices/${id}`),
  });

  const onSubmit = handleSubmit((data) => {
    if (isSuccess) {
      invoiceUpdateMutation.mutate({
        body: data,
        params: { id: invoice?.datas.id },
      });
    }
  });

  return (
    <Section id="invoice-by-id-section">
      {isSuccess && (
        <form onSubmit={onSubmit}>
          <InputField
            className="max-w-sm"
            {...register("billingPlanName")}
            label="Billing Plan Name"
            error={errors.billingPlanName?.message}
          />
          <div className="flex mt-4 lg:justify-end">
            <div className="w-full lg:w-auto">
              <Button
                variant="contained"
                disabled={
                  !isDirty || !isValid || invoiceUpdateMutation.isLoading
                }
                fullWidth
                title="Update"
              />
            </div>
          </div>
        </form>
      )}
    </Section>
  );
};

export default InvoiceByIdEditSection;
