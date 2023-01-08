import { NavHeader } from "./components/nav-header/nav-header";
import { PresetsList } from "./components/presets-list/presets-list";
import { SearchInput } from "./components/search-input/search-input";
import { useSortPresets } from "./hooks/sort-presets";
import { useUnsavedPresets } from "./hooks/unsaved-presets";

export const PresetsView: React.FC = () => {
	const { unsavedPresets, createPreset, deletePreset } = useUnsavedPresets();

	const presets = useSortPresets();
	return (
		<>
			<NavHeader createPreset={createPreset} />
			<SearchInput />
			<PresetsList
				presets={presets}
				unsavedPresets={unsavedPresets}
				deleteUnsavedPreset={deletePreset}
			/>
		</>
	);
};
