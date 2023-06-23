import { Section } from "@ui/atom";
// import { useInvoicesDelete, useInvoicesGet } from "@ustagil/web-state";
import { useRouter } from "next/router";
import { FC } from "react";

export interface InvoiceByIdSectionProps {
  id: string;
}

export const InvoiceByIdSection: FC<InvoiceByIdSectionProps> = ({ id }) => {
  const router = useRouter();
  // const { data, isSuccess } = useInvoicesGet({
  //   variables: { params: { id }, query: {} },
  // });

  // const invoiceDeleteMutation = useInvoicesDelete({
  //   onSuccess: () => router.push("/invoices"),
  //   onError: () => router.push("/invoices"),
  // });

  return (
    <Section id="invoice-by-id-section">
      {/* {isSuccess && (
        <div className="">
          <div className="flex justify-end gap-4">
            <NextLink href={`/invoices/${id}/edit`} legacyBehavior>
              <Button title="Edit" variant="outlined" />
            </NextLink>
            <Button
              title="Delete"
              variant="outlined"
              onClick={() => invoiceDeleteMutation.mutate({ params: { id } })}
            />
          </div>

          <div className="">
            <span>Amount: </span>
            <span>{data.datas.amount}</span>
          </div>
          <div className="">
            <span>Billing Plan Name: </span>
            <span>{data.datas.billingPlanName}</span>
          </div>
          <div className="">
            <span>Id: </span>
            <span>{data.datas.id}</span>
          </div>
          <div className="">
            <span>Invoice Date: </span>
            <span>{data.datas.invoiceDate}</span>
          </div>
          <div className="">
            <span>Paid Date: </span>
            <span>{data.datas.paidDate}</span>
          </div>
          <div className="">
            <span>Payment Method: </span>
            <span>{data.datas.paymentMethod}</span>
          </div>
          <div className="">
            <span>Recepient Name: </span>
            <span>{data.datas.recepientName}</span>
          </div>
          <div className="">
            <span>Status: </span>
            <span>{data.datas.status}</span>
          </div>
        </div>
      )} */}
    </Section>
  );
};

export default InvoiceByIdSection;
