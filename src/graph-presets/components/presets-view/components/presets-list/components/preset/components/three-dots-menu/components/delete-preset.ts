import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";

export type DeleteItem = () => void;

type Props = {
	deleteItem: DeleteItem;
	item: MenuItem;
	presetName: string;
};

export const DeletePreset = ({ deleteItem, item, presetName }: Props) => {
	item.setTitle("Delete");
	item.setIcon("trash");
	item.onClick(async () => {
		await actions.deletePreset(presetName);
		deleteItem();
	});
};
