import {
  NextLink,
  Table as TableComp,
  TableBody,
  TableBodyRow,
  TableBodyRowCell,
  TableHead,
  TableHeadRow,
  TableHeadRowCell,
} from "@@/atom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Invoice } from "@ustagil/typing";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";

const columnHelper = createColumnHelper<Invoice>();

export interface InvoiceTableProps {
  data: Invoice[];
  pageCount: number;
  pageSize: number;
  pageIndex: number;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  isFetching: boolean;
}

export const InvoiceTable: FC<InvoiceTableProps> = ({
  data,
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
  isFetching,
}) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => (
          <NextLink href={`/invoices/${info.row.original.id}`}>
            <span className="underline">{info.getValue()}</span>
          </NextLink>
        ),
      }),
      columnHelper.accessor("amount", {}),
      columnHelper.accessor("billingPlanName", {}),
      columnHelper.accessor("invoiceDate", {}),
      columnHelper.accessor("paidDate", {}),
      columnHelper.accessor("paymentMethod", {}),
      columnHelper.accessor("recepientName", {}),
      columnHelper.accessor("status", {}),
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      rowSelection,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <TableComp>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeadRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeadRowCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHeadRowCell>
              ))}
            </TableHeadRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableBodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableBodyRowCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableBodyRowCell>
              ))}
            </TableBodyRow>
          ))}
        </TableBody>
      </TableComp>

      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;&lt;
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          &gt;&gt;
        </button>
        <span className="flex items-center gap-1">
          Page: {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <span className="flex items-center gap-1">| Go to page:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="w-16 p-1 border rounded"
        />
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {isFetching ? "Loading..." : null}
      </div>
    </div>
  );
};

export default InvoiceTable;
