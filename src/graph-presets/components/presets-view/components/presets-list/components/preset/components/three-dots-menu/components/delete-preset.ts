import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";


type Props = {
	item: MenuItem;
	presetName: string;
};

export const DeletePreset = ({ item, presetName }: Props) => {
	item.setTitle("Delete");
	item.setIcon("trash");
	item.onClick(async () => {
		await actions.deletePreset(presetName);
	});
};
