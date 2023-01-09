import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { t } from "../lang/text";
import { parseMarkDownPreset } from "../helpers/parse-markdown-preset/parse-markdown-preset";
import { graphSettingsGroup } from "../../types/apply-preset";
import { filesByCtime } from "../store/cache/files-by-time";

export type GetPresetDTO = {
	created: number;
	group?: graphSettingsGroup;
};

export const getPreset = async ({ created }: GetPresetDTO) => {
	const file = filesByCtime.current[created];
	const data = await obsidian.fs.readFile({ file });
	try {
		return parseMarkDownPreset(data);
	} catch (e) {
		new Notice(t.c.MARKDOWN_PARSING_ERROR);
		throw e;
	}
};
