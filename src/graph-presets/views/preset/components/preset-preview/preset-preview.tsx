import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { GraphSettings } from "src/types/graph-settings";
import { ColorGroupsOptionsPreview } from "./components/groups/color-groups-options-preview";
import { DisplayOptionsPreview } from "./components/groups/display-options-preview";
import { FilterOptionsPreview } from "./components/groups/filter-options-preview";
import { ForcesOptionsPreview } from "./components/groups/forces-options-preview";

type Props = {
	meta: MarkdownPresetMeta;
	preset: {
		data?: GraphSettings;
		error?: Error;
	};
};

export const PresetPreview: React.FC<Props> = ({
	meta,
	preset: { data, error },
}) => {
	if (error)
		return (
			<div style={{ padding: 10, backgroundColor: "#ff000010" }}>
				Error parsing preset
			</div>
		);
	if (!data) return null;

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
			<FilterOptionsPreview options={data} meta={meta} />
			<ColorGroupsOptionsPreview options={data} meta={meta} />
			<DisplayOptionsPreview options={data} meta={meta} />
			<ForcesOptionsPreview options={data} meta={meta} />
		</div>
	);
};
