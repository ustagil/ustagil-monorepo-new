import { useInvoicesList } from "@acme/state";
import { Invoice } from "@acme/typings";
import { PaginationState } from "@tanstack/react-table";
import { FC, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiHandCoinLine } from "react-icons/ri";
import { TiFlowMerge } from "react-icons/ti";
import { Grid, Section } from "../../../../atoms";
import { InvoicesDataCard, InvoiceTable } from "../../../../molecules";

export interface InvoiceSectionProps {}

const defaultData: Invoice[] = [];

export const InvoiceSection: FC<InvoiceSectionProps> = ({}) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isFetching } = useInvoicesList({
    variables: {
      params: {},
      query: {
        pageIndex,
        pageSize,
      },
    },
    keepPreviousData: true,
  });

  return (
    <Section id="invoice-section">
      <Grid>
        <InvoicesDataCard
          point="5"
          title="Integrations"
          icon={
            <TiFlowMerge className="w-10 h-10 p-1 text-gray-200 border border-gray-300 rounded-full bg-primary-400" />
          }
        />
        <InvoicesDataCard
          point="25"
          title="Invoices"
          icon={
            <IoDocumentTextOutline className="w-10 h-10 p-1 text-gray-200 border border-gray-300 rounded-full bg-primary-400" />
          }
        />
        <InvoicesDataCard
          point="$314"
          title="Invoiced"
          icon={
            <ImSpinner3 className="w-10 h-10 p-1 text-gray-200 border border-gray-300 rounded-full bg-primary-400" />
          }
        />
        <InvoicesDataCard
          point="$280"
          title="Paid"
          icon={
            <RiHandCoinLine className="w-10 h-10 p-1 text-gray-200 border border-gray-300 rounded-full bg-primary-400" />
          }
        />
      </Grid>
      <InvoiceTable
        data={data?.datas ?? defaultData}
        pageCount={data?.count ? Math.ceil(data?.count / pageSize) : -1}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        isFetching={isFetching}
      />
    </Section>
  );
};

export default InvoiceSection;
