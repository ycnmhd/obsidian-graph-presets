import { Command } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import GraphPresets from "src/main";

export const applyGraphPreset = (): Command[] => {
	const plugin = GraphPresets.getInstance();
	return Object.values(plugin.store.getSnapshot().state.meta).map(
		(preset) => {
			return {
				id: `apply-graph-preset-${preset.created}`,
				name: `Apply: ${preset.name}`,
				callback: () => {
					actions.applyPreset(preset);
				},
			};
		}
	);
};
