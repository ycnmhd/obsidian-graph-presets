import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { parseMarkDownPreset } from "../monkey-patches/apply-markdown-preset/helpers/parse-markdown-preset/parse-markdown-preset";

export type GetPresetDTO = {
	created: number;
};

export const getPreset = async ({ created }: GetPresetDTO) => {
	const plugin = GraphPresets.getInstance();
	const file = plugin.store.getSnapshot().state.files[created];
	const data = await obsidian.fs.readFile({ file });
	return parseMarkDownPreset(data);
};
