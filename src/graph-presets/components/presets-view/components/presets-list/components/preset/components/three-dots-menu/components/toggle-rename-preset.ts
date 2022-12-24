import { MenuItem } from "obsidian";
type Props = {
	item: MenuItem;
	toggleRenamePreset: () => void;
};
export const ToggleRenamePreset = ({ item, toggleRenamePreset }: Props) => {
	item.setTitle("Rename");
	item.setIcon("edit");
	item.onClick(async () => {
		toggleRenamePreset();
	});
};
