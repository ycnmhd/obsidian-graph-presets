import { Menu, Notice } from "obsidian";
import { svgs } from "src/assets/svgs";
import { getGraphSettings } from "src/helpers/get-graph-settings";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { createSwitcherListItem } from "./create-switcher-list-item";

type Props = {
	listItem: HTMLElement;
	presetName: string;
};
export const createThreeDotsMenu = ({ listItem, presetName }: Props) => {
	const plugin = GraphPresets.getInstance();
	const controls = listItem.querySelector(
		".setting-item-control"
	) as HTMLElement;
	const button = controls.createEl("button");
	button.innerHTML = svgs["ellipsis-vertical"];
	button.addEventListener("click", (event) => {
		const menu = new Menu();
		menu.addItem((item) => {
			item.setTitle("Update");
			item.setIcon("edit");
			item.onClick(async () => {
				const settings = await getGraphSettings();
				plugin.settings.presets[presetName] = {
					meta: {
						...plugin.settings.presets[presetName].meta,
						updated: Date.now(),
					},
					settings,
				};
				await plugin.saveSettings();
				listItem.empty();
				createSwitcherListItem({
					listItem,
					presetName: presetName,
				});
				new Notice(`Preset "${presetName}" updated`);
			});
		});

		menu.addItem((item) => {
			item.setTitle("Rename");
			item.setIcon("edit");
			item.onClick(async () => {
				listItem.empty();
				createSwitcherListItem({
					listItem,
					presetName: presetName,
					editing: true,
				});
			});
		});
		menu.addItem((item) => {
			item.setTitle("Delete");
			item.setIcon("trash");
			item.onClick(async () => {
				delete plugin.settings.presets[presetName];
				await plugin.saveSettings();
				listItem.remove();
				new Notice(`Preset "${presetName}" deleted`);
			});
		});
		menu.showAtMouseEvent(event);
	});
};
