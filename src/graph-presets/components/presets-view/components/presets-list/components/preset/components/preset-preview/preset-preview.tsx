import { GraphPresets } from "src/graph-presets/graph-presets";
import { ColorGroupsOptionsPreview } from "./groups/color-groups-options-preview";
import { DisplayOptionsPreview } from "./groups/display-options-preview";
import { FilterOptionsPreview } from "./groups/filter-options-preview";
import { ForcesOptionsPreview } from "./groups/forces-options-preview";

type Props = {
	presetName: string;
};

export const PresetPreview: React.FC<Props> = ({ presetName }) => {
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	const preset = presets[presetName];
	return (
		<div
			className="graph-controls"
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				width: "100%",
				position: "static",
				boxShadow: "none",
				background: "none",
				border: "none",
				justifyContent: "center",
			}}
		>
			<FilterOptionsPreview
				options={preset.settings}
				presetName={presetName}
			/>
			<ColorGroupsOptionsPreview
				options={preset.settings}
				presetName={presetName}
			/>
			<DisplayOptionsPreview
				options={preset.settings}
				presetName={presetName}
			/>
			<ForcesOptionsPreview
				options={preset.settings}
				presetName={presetName}
			/>
		</div>
	);
};
