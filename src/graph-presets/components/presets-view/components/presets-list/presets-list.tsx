import {  MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { PresetsViewState } from "../../hooks/unsaved-presets";
import { navBarHeight } from "../nav-header/nav-header";
import { searchInputHeight } from "../search-input/search-input";
import { Preset } from "./components/preset/preset";

type Props = {
	presets: MarkdownPresetMeta[];
	unsavedPresets: PresetsViewState["unsavedPresets"];
	deleteUnsavedPreset: (ts: number) => void;
};

export const PresetsList: React.FC<Props> = ({
	presets,
	unsavedPresets,
	deleteUnsavedPreset,
}) => {
	return (
		<div
			style={{
				height: `calc(100% - ${navBarHeight + searchInputHeight + 10}px)`,
				padding: "5px",
				overflowY: "scroll",
				marginLeft: 16
			}}
		>
			{unsavedPresets.map((preset) => (
				<Preset
					meta={preset}
					key={preset.created}
					deleteUnsavedPreset={() =>
						deleteUnsavedPreset(preset.created)
					}
				/>
			))}
			{presets.map((preset) => (
				<Preset meta={preset} key={preset.created} />
			))}
		</div>
	);
};
