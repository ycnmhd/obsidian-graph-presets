import { useMemo } from "react";
import { MarkdownPresetMeta } from "src/graph-presets";
import { PluginSettings } from "src/types/settings/settings";
import { useAppSelector } from "src/store/hooks";
import { filesByCtime } from "src/store/cache/files-by-time";

const sortPresets = (
	unsortedEntries: MarkdownPresetMeta[],
	sortBy: PluginSettings["preferences"]["sortBy"]
) => {
	let sortedEntries: MarkdownPresetMeta[];
	switch (sortBy) {
		case "presetNameAsc":
			sortedEntries = unsortedEntries.sort((a, b) =>
				filesByCtime.current[a.created].basename.localeCompare(
					filesByCtime.current[b.created].basename
				)
			);
			break;
		case "presetNameDesc":
			sortedEntries = unsortedEntries.sort((a, b) =>
				filesByCtime.current[b.created].basename.localeCompare(
					filesByCtime.current[a.created].basename
				)
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
			sortedEntries = unsortedEntries.sort((a, b) => {
				return (
					filesByCtime.current[a.created].stat.mtime -
					filesByCtime.current[b.created].stat.mtime
				);
			});
			break;
		case "dateModifiedDesc":
			sortedEntries = unsortedEntries.sort(
				(a, b) =>
					filesByCtime.current[b.created].stat.mtime -
					filesByCtime.current[a.created].stat.mtime
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

export const useSortPresets = () => {
	const presets = useAppSelector((state) => state.presets.meta);
	const filter = useAppSelector((state) => state.preferences.filter);
	const sortBy = useAppSelector((state) => state.preferences.sortBy);
	const starred = useAppSelector((state) => state.presets.starredPresets);
	return useMemo(() => {
		const fullList = Object.values(presets);
		const filteredList = fullList.filter((preset) =>
			filesByCtime.current[preset.created].path
				.toLowerCase()
				.includes(filter.toLowerCase())
		);
		const staredList = filteredList.filter(
			(preset) => starred[preset.created]
		);
		const unStarredList = filteredList.filter(
			(preset) => !starred[preset.created]
		);

		return [
			...sortPresets(staredList, sortBy),
			...sortPresets(unStarredList, sortBy),
		];
	}, [presets, filter, sortBy, starred]);
};
