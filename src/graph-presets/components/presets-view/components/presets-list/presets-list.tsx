import { GraphPresets } from "src/graph-presets/graph-presets";
import { Preset as TPreset } from "src/graph-presets/settings/default-settings";
import { Preset } from "./components/preset/preset";

type Props = {
	presets: GraphPresets["settings"]["presets"];
	unsavedPresets: TPreset[];
	deleteUnsavedPreset: (ts: number) => void;
};

export const PresetsList: React.FC<Props> = ({
	presets,
	unsavedPresets,
	deleteUnsavedPreset,
}) => {
	return (
		<div>
			{Object.keys(presets).map((presetName) => (
				<Preset presetName={presetName} key={presetName} />
			))}
			{unsavedPresets.map((preset) => (
				<Preset
					presetName={""}
					key={preset.meta.created}
					deleteUnsavedPreset={() =>
						deleteUnsavedPreset(preset.meta.created)
					}
				/>
			))}
		</div>
	);
};
