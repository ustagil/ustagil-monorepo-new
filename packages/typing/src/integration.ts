export type IntegrationApp = "slack" | "discord";
export type IntegrationStatus = 0 | 1 | 2;

export type Integration = {
  id: string;
  name: string;
  app: IntegrationApp;
  status: IntegrationStatus;
  lastSentMessage: string;
  errorMessage: string;
  email: string;
};

export type IntegrationGetDto = {
  params: { id: string };
  query: Record<string, never>;
};

export type IntegrationListDto = {
  params: Record<string, never>;
  query: {
    pageIndex: number;
    pageSize: number;
    name?: string;
    app?: string;
    status?: IntegrationStatus;
    lastSentMessage?: string;
    errorMessage?: string;
    email?: string;
  };
};

export type IntegrationCreateDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: { name: string };
};

export type IntegrationUpdateDto = {
  params: { id: string };
  body: { name?: string };
};

export type IntegrationDeleteDto = { params: { id: string } };
