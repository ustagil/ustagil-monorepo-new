export type Article = { id: string; name: string };

export type ArticleReadDto = {
  params: { id: string };
  query: Record<string, string | number>;
};

export type ArticleListDto = {
  params: Record<string, string | number>;
  query: Record<string, string | number>;
};

export type ArticleCreateDto = {
  params: Record<string, string | number>;
  query: Record<string, string | number>;
  body: { name: string };
};

export type ArticleUpdateDto = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleDeleteDto = { params: { id: string } };
