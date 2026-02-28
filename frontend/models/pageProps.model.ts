export interface IParams {
  slug: string;
}

export type TPageProps<Params extends IParams, SearchParams> = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
