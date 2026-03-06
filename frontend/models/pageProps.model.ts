export type TPageProps<
  Params extends Record<string, string> = { slug: string },
  Search extends Record<string, string | string[] | undefined> = {},
> = {
  params: Promise<Params>;
  searchParams: Promise<Search>;
};
