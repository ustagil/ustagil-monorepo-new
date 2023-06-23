export type ArticleListDto = {
  query: any;
};

export type ArticleReadDto = {
  query: any;
  params: { id: string };
};

export type ArticleCreateDto = {
  query: any;
  body: any;
};

export type ArticleUpdateDto = {
  params: { id: string };
  body: any;
};

export type ArticleDeleteDto = {
  params: { id: string };
};
