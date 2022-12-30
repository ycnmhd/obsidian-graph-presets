import { GraphPresets } from "../graph-presets";
import { graphSettingsGroup } from "./apply-preset";
import { GetPresetDTO } from "./get-preset";
import { savePresetToMarkdown } from "./save-preset-to-markdown/save-preset-to-markdown";

export const updatePreset = async (
	dto: GetPresetDTO,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();
	const file = await plugin.store.getSnapshot().state.files[dto.created];
	await savePresetToMarkdown({
		file,
		mode: "update",
		group,
	});
	plugin.loadMarkdownPresetsMeta();
};
