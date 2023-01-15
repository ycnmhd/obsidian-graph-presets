import { logger } from "src/helpers/logger";
import { PresetView } from "src/views/preset/preset-view";

export const viewOfFile: { current: Record<number, Set<PresetView>> } = {
	current: {},
};

export const addView = (view: PresetView) => {
	if (!view.file) {
		logger.error("view.file is undefined");
		return;
	}
	const created = view.file.stat.ctime;
	if (!viewOfFile.current[created]) {
		viewOfFile.current[created] = new Set();
	}
	viewOfFile.current[created].add(view);
};
export const removeView = (view: PresetView, created: number) => {
	viewOfFile.current[created].delete(view);
};

export const getView = (created: number) => {
	return viewOfFile.current[created].entries().next().value[1];
};
