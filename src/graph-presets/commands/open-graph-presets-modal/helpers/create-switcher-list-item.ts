import { Notice } from "obsidian";
import { svgs } from "src/assets/svgs";
import { getGraphSettings } from "src/helpers/get-graph-settings";
import { saveGraphSettings } from "src/helpers/save-graph-settings";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { createThreeDotsMenu } from "./create-three-dots-menu";

type Props = {
	listItem: HTMLElement;
	presetName: string;
	editing?: boolean;
	renderList: () => void;
};

type State = { editing: boolean };
export const createSwitcherListItem = async ({
	listItem,
	presetName,
	editing,
	renderList,
}: Props) => {
	const state: State = { editing: editing || presetName === "" };
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;

	const info = listItem.createEl("div", {
		cls: "setting-item-info",
	});
	const controls = listItem.createEl("div", {
		cls: "setting-item-control",
	});
	if (presetName) {
		const isSelected =
			JSON.stringify(presets[presetName]?.settings) ===
			JSON.stringify(await getGraphSettings());
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

	if (state.editing) {
		controls.createEl("input", {
			value: presetName,
			type: "text",
			placeholder: "Preset name",
		});
		const saveButton = controls.createEl("button", {
			text: "Save",
			cls: "mod-cta",
		});

		saveButton.addEventListener("click", async () => {
			const settings = await getGraphSettings();
			const existingPreset = presets[presetName];
			delete presets[presetName];

			const input = listItem.querySelector("input") as HTMLInputElement;

			const value = input.value;
			if (value) {
				plugin.settings.presets[value] = {
					settings: existingPreset?.settings || settings,
					meta: {
						created: existingPreset?.meta.created || Date.now(),
						updated: existingPreset?.meta.updated || Date.now(),
					},
				};
				await plugin.saveSettings();
				new Notice(`"${value}" saved`);
				listItem.empty();
				createSwitcherListItem({
					listItem,
					presetName: value,
					renderList: renderList,
				});
			}
		});

		const cancelButton = controls.createEl("button", {});
		cancelButton.innerHTML = svgs["x-circle"];
		cancelButton.addEventListener("click", () => {
			if (!presetName) {
				listItem.remove();
			} else {
				listItem.empty();
				createSwitcherListItem({
					listItem,
					presetName: presetName,
					renderList,
				});
			}
		});
	} else {
		const applyButton = controls.createEl("button", {
			text: "Apply",
			cls: "mod-cta",
		});
		applyButton.addEventListener("click", async () => {
			const preset = presets[presetName];
			await saveGraphSettings(preset.settings);
			renderList();
			new Notice(`"${presetName}" applied`);
		});
		createThreeDotsMenu({ listItem, presetName: presetName, renderList });
	}
};
