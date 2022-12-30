import { useMemo, useSyncExternalStore } from "react";
import { GraphPresets, MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { NavHeader } from "./components/nav-header/nav-header";
import { PresetsList } from "./components/presets-list/presets-list";
import { useUnsavedPresets } from "./hooks/unsaved-presets";

export const PresetsView: React.FC = () => {
	const plugin = GraphPresets.getInstance();
	const store = useSyncExternalStore(
		plugin.store.subscribe,
		plugin.store.getSnapshot
	);

	const { unsavedPresets, createPreset, deletePreset } = useUnsavedPresets();

	const presets = useMemo(() => {
		const unsortedEntries = Object.values(store.state.meta);
		let sortedEntries: MarkdownPresetMeta[];
		switch (store.settings.preferences.sortBy) {
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
			case "dateCreatedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a.created - b.created
				);
				break;
			case "dateCreatedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b.created - a.created
				);
				break;
			case "dateModifiedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a.updated - b.updated
				);
				break;
			case "dateModifiedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b.updated - a.updated
				);

				break;
			case "dateAppliedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a.applied - b.applied
				);
				break;
			case "dateAppliedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b.applied - a.applied
				);
				break;
		}
		return sortedEntries;
	}, [store.settings, store.state]);

	return (
		<>
			<NavHeader
				createPreset={createPreset}
				sortBy={store.settings.preferences.sortBy}
			/>
			<PresetsList
				presets={presets}
				unsavedPresets={unsavedPresets}
				deleteUnsavedPreset={deletePreset}
			/>
		</>
	);
};
