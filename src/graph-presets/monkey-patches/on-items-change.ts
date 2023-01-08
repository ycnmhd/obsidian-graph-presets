import { getStarredFiles } from "../helpers/get-starred-files";
import { ac } from "../store/store";

export const onItemsChanged = (next: any) => {
	return function (e: any, ...args: any) {
		setTimeout(() => {
			ac.setStarredFiles(getStarredFiles());
		}, 0);
		next.apply(this, [e, ...args]);
	};
};
