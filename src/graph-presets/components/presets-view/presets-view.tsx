import { useSyncExternalStore } from "react";
import {
	GraphPresets,
} from "src/graph-presets/graph-presets";
import { NavHeader } from "./components/nav-header/nav-header";
import { PresetsList } from "./components/presets-list/presets-list";
import { SearchInput } from "./components/search-input/search-input";
import { useSortPresets } from "./hooks/sort-presets";
import { useUnsavedPresets } from "./hooks/unsaved-presets";

export const PresetsView: React.FC = () => {
	const plugin = GraphPresets.getInstance();
	const store = useSyncExternalStore(
		plugin.store.subscribe,
		plugin.store.getSnapshot
	);

	const { unsavedPresets, createPreset, deletePreset } = useUnsavedPresets();

	const presets = useSortPresets(store);
	return (
		<>
			<NavHeader
				createPreset={createPreset}
				sortBy={store.settings.preferences.sortBy}
			/>
			<SearchInput currentValue={store.state.filter} />
			<PresetsList
				presets={presets}
				unsavedPresets={unsavedPresets}
				deleteUnsavedPreset={deletePreset}
			/>
		</>
	);
};
