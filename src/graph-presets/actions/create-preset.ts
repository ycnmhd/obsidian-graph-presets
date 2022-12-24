import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";

export const createPreset = async (presetName: string) => {
	const graphSettings = await obsidian.getGraphSettings();
	const plugin = GraphPresets.getInstance();
	let suffix = 2;
	if (plugin.settings.presets[presetName]) {
		while (plugin.settings.presets[`${presetName} (${suffix})`]) {
			suffix++;
		}
		presetName = `${presetName} (${suffix})`;
	}
	plugin.settings.presets = {
		...plugin.settings.presets,
		[presetName]: {
			settings: graphSettings,
			meta: {
				created: Date.now(),
				updated: Date.now(),
				applied: 0,
			},
		},
	};
	await plugin.saveSettings();
};
