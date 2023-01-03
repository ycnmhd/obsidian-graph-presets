import { Notice, TFile } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { t } from "../lang/text";
import { parseMarkDownPreset } from "../monkey-patches/apply-markdown-preset/helpers/parse-markdown-preset/parse-markdown-preset";

export type GetPresetDTO = {
	created: number;
	file?: TFile;
};

export const getPreset = async ({ created }: GetPresetDTO) => {
	const plugin = GraphPresets.getInstance();
	const file = plugin.store.getSnapshot().state.filesByCtime[created];
	const data = await obsidian.fs.readFile({ file });
	try{

		return parseMarkDownPreset(data);
	}
	catch(e){		
		new Notice(t.c.MARKDOWN_PARSING_ERROR);
		throw e
	}
};
