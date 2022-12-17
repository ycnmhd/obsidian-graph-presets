import { GraphPresets } from "src/graph-presets/graph-presets";
import { Preset } from "./components/preset/preset";

type Props = {
	list: HTMLElement;
	renderList: () => void;
};
export const PresetsList = ({ list, renderList }: Props) => {
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	Object.keys(presets).forEach((presetName) =>
		Preset({
			listItem: list.createEl("div", {
				cls: "setting-item",
			}),
			presetName,
			renderList,
		})
	);
};
