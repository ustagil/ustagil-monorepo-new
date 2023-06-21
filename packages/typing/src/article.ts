export type Article = { id: string; name: string };

export type ArticleReadDto = {
  params: { id: string };
  query: Record<string, never>;
};

export type ArticleListDto = {
  params: Record<string, never>;
  query: Record<string, never>;
};

export type ArticleCreateDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: { name: string };
};

export type ArticleUpdateDto = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleDeleteDto = { params: { id: string } };
