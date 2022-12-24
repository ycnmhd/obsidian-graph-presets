import { GraphPresets } from "../graph-presets";
import { SortMode } from "../settings/default-settings";

export const setSortBy = async (sortBy: SortMode) => {
	const plugin = GraphPresets.getInstance();
	plugin.settings.preferences.sortBy = sortBy;
	await plugin.saveSettings();
};
