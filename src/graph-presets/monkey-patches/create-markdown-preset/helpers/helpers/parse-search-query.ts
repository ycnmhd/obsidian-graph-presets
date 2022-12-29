import {
	SearchQueryVariant,	
	searchQueryVariants,
} from "src/types/search-query";

export type QueryStringTuple = [SearchQueryVariant, string];
export const parseSearchQuery = (query: string): QueryStringTuple[] => {
	const regex = new RegExp(`(${searchQueryVariants.join("|")})`, "g");
	const queryParts = query.split(regex).filter(Boolean);
	const queryTuples: QueryStringTuple[] = [];
	for (let i = 0; i < queryParts.length; i += 2) {
		queryTuples.push([
			queryParts[i] as SearchQueryVariant,
			queryParts[i + 1].replace(/^:/, "").trim(),
		]);
	}
    return queryTuples;
};
