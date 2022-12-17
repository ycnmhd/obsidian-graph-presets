import { GraphPresets } from "../graph-presets";

export const renamePreset = async (presetName: string, newName: string) => {
	if(!presetName || !newName) throw new Error("Preset name and new name are required");
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	const existingPreset = presets[presetName];
	if(!existingPreset) throw new Error(`Preset "${presetName}" does not exist`);
	delete presets[presetName];
	presets[newName] = existingPreset;
	await plugin.saveSettings();
};
