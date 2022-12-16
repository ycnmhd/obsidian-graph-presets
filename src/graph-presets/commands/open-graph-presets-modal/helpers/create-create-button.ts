import { Modal } from "obsidian";
import { createSwitcherListItem } from "./create-switcher-list-item";

type Props = {
	list: HTMLElement;
	modal: Modal;
};

export const createCreateButton = ({ list, modal }: Props) => {
	const listItem = modal.contentEl.createEl("div", {
		cls: "setting-item",
	});
	const controls = listItem.createEl("div", {
		cls: "setting-item-control",
	});
	const createButton = controls.createEl("button", {
		text: "Create a new preset",
		cls: "mod-cta",
	});
	createButton.addEventListener("click", async () => {
		createSwitcherListItem({
			listItem: list.createEl("div", {
				cls: "setting-item",
			}),
			presetName: "",
		});
	});
};
