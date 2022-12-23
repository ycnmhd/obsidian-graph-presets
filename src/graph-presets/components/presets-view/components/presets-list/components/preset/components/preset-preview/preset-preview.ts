import { GraphPresets } from "src/graph-presets/graph-presets";
import { ColorGroupsOptionsPreview } from "./color-groups-options-preview";
import { DisplayOptionsPreview } from "./display-options-preview";
import { FilterOptionsPreview } from "./filter-options-preview";
import { ForcesOptionsPreview } from "./forces-options-preview";

type Props = {
	containerEl: HTMLElement;
	presetName: string;
};
export const PresetPreview = ({ containerEl, presetName }: Props) => {
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	const preset = presets[presetName];
	const previewEl = containerEl.createEl("div", {
		attr: {
			style: `
            display: flex; 
            flex-direction: row; 
            flex-wrap: wrap; 
            width: 100%; 
            position: static; 
            box-shadow: none; 
            background: none; 
            border: none; 
            justify-content: center;
            `,
		},
		cls: "graph-controls",
	});

	

	FilterOptionsPreview({
		containerEl: previewEl,
		options: preset.settings,
	});
	ColorGroupsOptionsPreview({
		containerEl: previewEl,
		options: preset.settings,
	});

	DisplayOptionsPreview({
		containerEl: previewEl,
		options: preset.settings,
	});
	ForcesOptionsPreview({
		containerEl: previewEl,
		options: preset.settings,
	});
};
