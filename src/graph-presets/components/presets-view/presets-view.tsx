import { useSyncExternalStore } from "react";
import { GraphPresets } from "src/graph-presets/graph-presets";
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

	return (
		<>
			<NavHeader createPreset={createPreset} />
			<PresetsList
				presets={store.presets}
				deleteUnsavedPreset={deletePreset}
				unsavedPresets={unsavedPresets}
			/>
		</>
	);
};
