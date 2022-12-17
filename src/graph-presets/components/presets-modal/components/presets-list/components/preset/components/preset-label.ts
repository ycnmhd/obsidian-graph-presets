import { svgs } from "src/assets/svgs";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { obsidian } from "src/obsidian/obsidian";

type Props = {
	info: HTMLElement;
	presetName: string;
};
export const PresetLabel = async ({ info, presetName }: Props) => {
	if (presetName) {
		const presets = GraphPresets.getInstance().settings.presets;
		const isSelected =
			JSON.stringify(presets[presetName]?.settings) ===
			JSON.stringify(await obsidian.getGraphSettings());
		const name = info.createEl("div", {
			text: presetName,
			cls: "setting-item-name",
		});
		if (isSelected) {
			const span = name.createEl("span");
			span.innerHTML = svgs["check-circle"];
		}

		const description = info.createEl("div", {
			cls: "setting-item-description",
		});

		description.createEl("div", {
			text: `Last updated ${new Date(
				presets[presetName].meta.updated
			).toLocaleString()}.`,
		});
		description.createEl("div", {
			text: `Search query: "${presets[presetName].settings.search}"`,
		});
	}
};
