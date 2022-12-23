import { Preset } from "./presets-list/components/preset/preset";

type Props = {
	list: HTMLElement;
	bar: HTMLElement;
	renderList: () => void;
};

export const AddPreset = ({ list, bar, renderList }: Props) => {
	const listItem = bar.createEl("div", {
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
