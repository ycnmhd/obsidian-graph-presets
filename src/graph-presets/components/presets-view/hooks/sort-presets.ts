import { useMemo } from "react";
import {
	GraphPresetsStore,
	MarkdownPresetMeta,
} from "src/graph-presets/graph-presets";
import { PluginSettings } from "src/graph-presets/settings/default-settings";

const sortPresets = (
	unsortedEntries: MarkdownPresetMeta[],
	sortBy: PluginSettings["preferences"]["sortBy"]
) => {
	let sortedEntries: MarkdownPresetMeta[];
	switch (sortBy) {
		case "presetNameAsc":
			sortedEntries = unsortedEntries.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
			break;
		case "presetNameDesc":
			sortedEntries = unsortedEntries.sort((a, b) =>
				b.name.localeCompare(a.name)
			);
			break;
		case "dateCreatedAsc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => a.created - b.created
			);
			break;
		case "dateCreatedDesc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => b.created - a.created
			);
			break;
		case "dateModifiedAsc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => a.updated - b.updated
			);
			break;
		case "dateModifiedDesc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => b.updated - a.updated
			);

			break;
		case "dateAppliedAsc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => a.applied - b.applied
			);
			break;
		case "dateAppliedDesc":
			sortedEntries = unsortedEntries.sort(
				(a, b) => b.applied - a.applied
			);
			break;
	}
	return sortedEntries;
};

export const useSortPresets = (store: GraphPresetsStore) => {
	return useMemo(() => {
		const fullList = Object.values(store.state.meta);
		const filteredList = fullList.filter((preset) =>
			preset.path.toLowerCase().includes(store.state.filter.toLowerCase())
		);
		const staredList = filteredList.filter((preset) => preset.starred);
		const unStarredList = filteredList.filter((preset) => !preset.starred);

		return [
			...sortPresets(staredList, store.settings.preferences.sortBy),
			...sortPresets(unStarredList, store.settings.preferences.sortBy),
		];
	}, [store.settings, store.state]);
};
