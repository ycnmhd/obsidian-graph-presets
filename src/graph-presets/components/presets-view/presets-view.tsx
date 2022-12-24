import { useMemo, useSyncExternalStore } from "react";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { Preset } from "src/graph-presets/settings/default-settings";
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
		const unsortedEntries = [...Object.entries(store.presets)] as [
			string,
			Preset
		][];

		let sortedEntries: [string, Preset][];
		switch (store.preferences.sortBy) {
			case "presetNameAsc":
				sortedEntries = unsortedEntries.sort((a, b) =>
					a[0].localeCompare(b[0])
				);
				break;
			case "presetNameDesc":
				sortedEntries = unsortedEntries.sort((a, b) =>
					b[0].localeCompare(a[0])
				);
				break;
			case "dateCreatedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a[1].meta.created - b[1].meta.created
				);
				break;
			case "dateCreatedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b[1].meta.created - a[1].meta.created
				);
				break;
			case "dateModifiedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a[1].meta.updated - b[1].meta.updated
				);
				break;
			case "dateModifiedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b[1].meta.updated - a[1].meta.updated
				);

				break;
			case "dateAppliedDesc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => a[1].meta.applied - b[1].meta.applied
				);
				break;
			case "dateAppliedAsc":
				sortedEntries = unsortedEntries.sort(
					(a, b) => b[1].meta.applied - a[1].meta.applied
				);
				break;
		}
		return Object.fromEntries(sortedEntries);
	}, [store]);

	return (
		<>
			<NavHeader
				createPreset={createPreset}
				sortBy={store.preferences.sortBy}
			/>
			<PresetsList
				presets={presets}
				unsavedPresets={unsavedPresets}
				deleteUnsavedPreset={deletePreset}
			/>
		</>
	);
};
