import { MarkdownPresetMeta } from "src/graph-presets";
import { getFileByCtime } from "src/helpers/obsidian/graph/helpers/get-file-by-ctime";
import { t } from "src/lang/text";
import { filesByCtime } from "src/store/cache/files-by-time";

export const getPresetDisplayText = (meta: MarkdownPresetMeta) => {
	const file = filesByCtime.current[meta.created];

	let suffix = "";
	if (meta?.localGraphFile) {
		const file = getFileByCtime(meta?.localGraphFile);
		if (file) {
			suffix = ` → ${file.basename}`;
		}
	}
	const base = file?.basename || t.c.PRESET;
	return `${base}${suffix}`;
};
