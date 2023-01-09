import {
	SearchQueryVariant,
	searchQueryVariants,
} from "src/types/search-query";

export type QueryStringTuple = [SearchQueryVariant, string];
export const parseSearchQuery = (query: string): QueryStringTuple[] | null => {
	const notInMiddleOfWord = "(?<!\\w)";
	const regex = new RegExp(
		`${notInMiddleOfWord}(${searchQueryVariants.join("|")})\\s?\\:`,
		"g"
	);
	const queryParts = query.split(regex).filter(Boolean);
	if (queryParts.length % 2 !== 0 || queryParts.length === 0) {
		return null;
	}
	const queryTuples: QueryStringTuple[] = [];
	for (let i = 0; i < queryParts.length; i += 2) {
		queryTuples.push([
			queryParts[i] as SearchQueryVariant,
			queryParts[i + 1].replace(/^:/, "").trim(),
		]);
	}
	return queryTuples;
};
