import { GraphPresets } from "src/graph-presets/graph-presets";

type Props = {
	presetName: string;
};

export const PresetLabel: React.FC<Props> = ({ presetName }) => {
	const presets = GraphPresets.getInstance().settings.presets;
	return (
		<>
			<div className="setting-item-name"> {presetName} </div>
			<div className="setting-item-description">
				<div>
					Last updated{" "}
					{new Date(
						presets[presetName].meta.updated
					).toLocaleString()}
				</div>
			</div>
		</>
	);
};
