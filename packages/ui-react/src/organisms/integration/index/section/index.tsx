import { useIntegrationsList } from "@acme/state";
import {
  Integration,
  IntegrationListDto,
  IntegrationStatus,
} from "@acme/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaginationState } from "@tanstack/react-table";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { InputField } from "../../../../atoms/form/input-field";
import { Select, SelectOption } from "../../../../atoms/form/select";
import { NextLink } from "../../../../atoms/next-link";
import { Section } from "../../../../atoms/section";
import { Button } from "../../../../molecules/common/button";
import { IntegrationTable } from "../../../../molecules/integration/table";

export interface IntegrationSectionProps {}

const schema = z.object({
  name: z.string().min(6),
  app: z.string().min(6),
  email: z.string().min(6),
  errorMessage: z.string().min(6),
  lastSentMessage: z.string().min(6),
  status: z.union([
    z.literal(undefined),
    z.literal(0),
    z.literal(1),
    z.literal(2),
  ]),
});

const defaultData: Integration[] = [];

export const IntegrationSection: FC<IntegrationSectionProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<
    Omit<IntegrationListDto["query"], "status"> & { status: SelectOption }
  >({
    defaultValues: {
      name: "",
      app: "",
      email: "",
      errorMessage: "",
      lastSentMessage: "",
      status: { id: "", label: "Not Selected", value: "" },
    },
    resolver: zodResolver(schema),
  });
  const { app, email, errorMessage, lastSentMessage, name, status } = watch();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isFetching } = useIntegrationsList({
    variables: {
      params: {},
      query: {
        pageIndex,
        pageSize,
        app,
        email,
        errorMessage,
        lastSentMessage,
        name,
        status: status.value as IntegrationStatus,
      },
    },
    keepPreviousData: true,
  });

  return (
    <Section id="integration-section">
      <div className="flex items-center justify-center">
        <div className="flex items-baseline justify-center flex-1">
          <form className="flex gap-3">
            <InputField
              {...register("app")}
              className="max-w-sm"
              label="App"
              error={errors.app?.message?.toString()}
            />
            <InputField
              {...register("email")}
              className="max-w-sm"
              label="E-Posta"
              type="email"
              autoComplete="email"
              error={errors.email?.message?.toString()}
            />
            <InputField
              {...register("errorMessage")}
              className="max-w-sm"
              label="Error Message"
              error={errors.errorMessage?.message?.toString()}
            />
            <InputField
              {...register("lastSentMessage")}
              className="max-w-sm"
              label="Last Sent Message"
              error={errors.lastSentMessage?.message?.toString()}
            />
            <InputField
              {...register("name")}
              className="max-w-sm"
              label="Name"
              error={errors.name?.message?.toString()}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="max-w-sm"
                  value={
                    field.value ?? {
                      id: "",
                      label: "Not Selected",
                      value: "",
                    }
                  }
                  label="Status"
                  options={[
                    { id: "", label: "Not Selected", value: "" },
                    { id: "1", label: "Active", value: 1 },
                    { id: "0", label: "Deactive", value: 0 },
                    { id: "2", label: "Error", value: 2 },
                  ]}
                />
              )}
            />
          </form>
        </div>
        <div className="flex items-center justify-center">
          <NextLink href="/integrations/check" legacyBehavior>
            <Button title="Add New" variant="flat" />
          </NextLink>
        </div>
      </div>
      <IntegrationTable
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

export default IntegrationSection;
