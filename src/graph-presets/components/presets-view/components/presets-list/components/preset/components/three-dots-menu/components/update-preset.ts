import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";

type Props = {
	item: MenuItem;
	presetName: string;
};

export const UpdatePreset = ({ item, presetName }: Props) => {
	item.setTitle("Update");
	item.setIcon("edit");
	item.onClick(async () => {
		await actions.updatePreset(presetName);
	});
};
