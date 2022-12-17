import { Modal } from "obsidian";
import { AddPreset } from "./components/add-preset";
import { PresetsList } from "./components/presets-list/presets-list";

type Props = {
	modal: Modal;
};

export const PresetsModal = ({ modal }: Props) => {
	modal.titleEl.innerText = "Graph presets";
	const list = modal.contentEl.createEl("div");

	const renderList = () => {
		list.empty();
		PresetsList({
			list,
			renderList,
		});
	};
	AddPreset({
		list,
		modal,
		renderList,
	});
	PresetsList({
		list,
		renderList,
	});
};
