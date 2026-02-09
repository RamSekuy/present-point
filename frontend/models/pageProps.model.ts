export interface IParams {
  slug: string;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export type TPageProps<
  Params extends IParams,
  SearchParams extends ISearchParams,
> = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
