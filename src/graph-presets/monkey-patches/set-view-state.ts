/* based on https://github.com/RafaelGB/obsidian-db-folder/blob/91f08085da0c71276407f034775f892497f661a2/src/main.ts#L591 */
import { ViewState } from "obsidian";
import { Router } from "../views/preset/helpers/router";

export function setViewState(next: any) {
	return function (state: ViewState, ...rest: any[]) {
		const router = Router.getInstance();

		if (
			state.type === "markdown" &&
			state.state?.file &&
			router.getLeafType(this) !== "markdown"
		) {
			const cache = app.metadataCache.getCache(state.state.file);

			if (cache?.frontmatter && cache.frontmatter[router.frontmatter]) {
				const newState = {
					...state,
					type: router.viewType,
				};
				router.setLeafType({
					leaf: this,
					type: router.viewType,
				});

				return next.apply(this, [newState, ...rest]);
			}
		}

		return next.apply(this, [state, ...rest]);
	};
}
