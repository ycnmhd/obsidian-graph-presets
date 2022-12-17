import { MenuItem } from "obsidian";
export type RenderItem = (props?: { editing?: boolean, presetName?: string }) => void;
type Props = {
	reRenderItem: RenderItem;
	item: MenuItem;
};
export const ToggleRenamePreset = ({ reRenderItem, item }: Props) => {
	item.setTitle("Rename");
	item.setIcon("edit");
	item.onClick(async () => {
		reRenderItem({ editing: true });
	});
};
