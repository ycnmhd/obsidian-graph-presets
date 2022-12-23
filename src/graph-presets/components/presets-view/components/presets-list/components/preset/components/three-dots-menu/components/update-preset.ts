import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { RenderItem } from "./toggle-rename-preset";

type Props = {
	reRenderItem: RenderItem;
	item: MenuItem;
	presetName: string;
};

export const UpdatePreset = ({ reRenderItem, item, presetName }: Props) => {
	item.setTitle("Update");
	item.setIcon("edit");
	item.onClick(async () => {
		await actions.updatePreset(presetName);
		reRenderItem();
	});
};
