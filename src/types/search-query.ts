export const searchQueryVariants = (["path", "file", "tag", "line", "section"] as const)
	.map((q) => [q, `-${q}`] as const)
	.flat();
export type SearchQueryVariant = typeof searchQueryVariants[number];
export const searchQueryVariantsSet = new Set(searchQueryVariants);
