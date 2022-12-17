import { Command } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import GraphPresets from "src/main";

export const applyGraphPreset = (): Command[] => {
	const plugin = GraphPresets.getInstance();
	return Object.keys(plugin.settings.presets).map((presetName) => {
		return {
			id: `apply-graph-preset-${presetName}`,
			name: `Apply: ${presetName}`,
			callback: () => {
				actions.applyPreset(presetName);
			},
		};
	});
};
