import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  NextLink,
  TableBody,
  TableBodyRow,
  TableBodyRowCell,
  Table as TableComp,
  TableHead,
  TableHeadRow,
  TableHeadRowCell,
} from "@ui/atom";
import {
  Dispatch,
  FC,
  HTMLProps,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Integration {
  id: string;
  name: string;
  app: string;
  status: string;
  lastSentMessage: string;
  errorMessage: string;
  email: string;
}

const columnHelper = createColumnHelper<Integration>();

export interface IntegrationTableProps {
  data: Integration[];
  pageCount: number;
  pageSize: number;
  pageIndex: number;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  isFetching: boolean;
}

export const IntegrationTable: FC<IntegrationTableProps> = ({
  data,
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
  isFetching,
}) => {
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: { table: any }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </div>
        ),
        cell: ({ row }: { row: any }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      columnHelper.accessor("name", {
        cell: (info) => (
          <NextLink href={`/integrations/${info.row.original.id}`}>
            <span className="underline">{info.getValue()}</span>
          </NextLink>
        ),
      }),
      columnHelper.accessor("app", {}),
      columnHelper.accessor("status", {}),
      columnHelper.accessor("lastSentMessage", {}),
      columnHelper.accessor("errorMessage", {}),
      columnHelper.accessor("email", {}),
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

export default IntegrationTable;

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <>
      <label className="sr-only" htmlFor="checkbox">
        Checkbox
      </label>
      <input
        id="checkbox"
        type="checkbox"
        ref={ref}
        className={className + " cursor-pointer"}
        {...rest}
      />
    </>
  );
}
