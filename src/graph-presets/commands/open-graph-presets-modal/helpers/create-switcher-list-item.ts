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
};

type State = { editing: boolean };
export const createSwitcherListItem = ({
	listItem,
	presetName,
	editing,
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
		info.createEl("div", {
			text: presetName,
			cls: "setting-item-name",
		});
		const description = info.createEl("div", {
			cls: "setting-item-description",
		});
		
		
		description.createEl("div", {
			text: `Last updated ${new Date(
				presets[presetName].meta.updated
			).toLocaleString()}.`,
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
					settings,
					meta: {
						created: existingPreset?.meta.created || Date.now(),
						updated: Date.now(),
					},
				};
				await plugin.saveSettings();
				new Notice(`"${value}" saved`);
				listItem.empty();
				createSwitcherListItem({
					listItem,
					presetName: value,
				});
			}
		});

		const cancelButton = controls.createEl("button", {});
		cancelButton.innerHTML = svgs["x-circle"];
		cancelButton.addEventListener("click", () => {
			listItem.empty();
			delete presets[presetName];
			createSwitcherListItem({
				listItem,
				presetName: presetName,
			});
		});
	} else {
		const applyButton = controls.createEl("button", {
			text: "Apply",
			cls: "mod-cta",
		});
		applyButton.addEventListener("click", async () => {
			const preset = presets[presetName];
			await saveGraphSettings(preset.settings);
			new Notice(`"${presetName}" applied`);
		});
		createThreeDotsMenu({ listItem, presetName: presetName });
	}
};
