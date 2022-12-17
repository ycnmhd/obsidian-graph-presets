import { Modal } from "obsidian";
import { Preset } from "./presets-list/components/preset/preset";

type Props = {
	list: HTMLElement;
	modal: Modal;
	renderList: () => void;
};

export const AddPreset = ({ list, modal, renderList }: Props) => {
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
		Preset({
			listItem: list.createEl("div", {
				cls: "setting-item",
			}),
			presetName: "",
			renderList,
		});
	});
};
