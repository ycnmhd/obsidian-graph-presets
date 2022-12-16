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
	info.createEl("div", {
		text: presetName,
		cls: "setting-item-name",
	});
	info.createEl("div", {
		text: "Graph preset",
		cls: "setting-item-description",
	});

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
			const existingSettings = presets[presetName];
			const input = listItem.querySelector("input") as HTMLInputElement;

			const value = input.value;
			if (value) {
				plugin.settings.presets[value] = existingSettings || settings;
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
			const settings = presets[presetName];
			await saveGraphSettings(settings);
			new Notice(`"${presetName}" applied`);
		});
		createThreeDotsMenu({ listItem, presetName: presetName });
	}
};
