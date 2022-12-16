import { Command, Modal } from "obsidian";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { createCreateButton } from "./helpers/create-create-button";
import { createSwitcherListItem } from "./helpers/create-switcher-list-item";

export const openGraphPresetsModal: Command = {
	id: "open-graph-presets-modal",
	name: "Open graph presets modal",
	callback: async () => {
		const modal = new Modal(app);
		modal.open();
		modal.titleEl.innerText = "Graph presets";
		const list = modal.contentEl.createEl("div");
		const plugin = GraphPresets.getInstance();
		const presets = plugin.settings.presets;
		Object.keys(presets).forEach((presetName) =>
			createSwitcherListItem({
				listItem: list.createEl("div", {
					cls: "setting-item",
				}),
				presetName
			})
		);
		// add a create button to the modal
		createCreateButton({
			list,
			modal,
		});
	},
};
