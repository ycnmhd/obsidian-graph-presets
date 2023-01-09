/* based on https://github.com/RafaelGB/obsidian-db-folder/blob/91f08085da0c71276407f034775f892497f661a2/src/main.ts#L591 */
import { ViewState } from "obsidian";
import { Router } from "../views/preset/helpers/router";

export function setViewState(next: any) {
	return function (state: ViewState, ...rest: any[]) {
		const router = Router.getInstance();
		const isMarkdownView = state.type === "markdown";
		const fileType = router.getFileType(state?.state?.file);
		const typeIsMd = fileType === "markdown";

		if (isMarkdownView && !typeIsMd) {
			const cache = app.metadataCache.getCache(state.state.file);

			const hasPresetFrontmatter =
				cache?.frontmatter && cache.frontmatter[router.frontmatter];
			const typeIsPreset = fileType === router.viewType;
			if (hasPresetFrontmatter) {
				const newState = {
					...state,
					type: router.viewType,
				};
				if (!typeIsPreset)
					router.setFileType({
						path: state.state.file,
						type: router.viewType,
					});

				return next.apply(this, [newState, ...rest]);
			}
		}

		return next.apply(this, [state, ...rest]);
	};
}
