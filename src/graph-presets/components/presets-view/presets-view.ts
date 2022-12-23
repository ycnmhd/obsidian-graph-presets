import { AddPreset } from "./components/add-preset";
import { PresetsList } from "./components/presets-list/presets-list";

type Props = {
	containerEl: HTMLElement;
};

export const PresetsView = ({ containerEl }: Props) => {
	const bar = containerEl.createEl("div");
	const list = containerEl.createEl("div");
	const renderList = () => {
		list.empty();
		PresetsList({
			list,
			renderList,
		});
	};
	AddPreset({
		list,
		bar,
		renderList,
	});
	PresetsList({
		list,
		renderList,
	});
};
