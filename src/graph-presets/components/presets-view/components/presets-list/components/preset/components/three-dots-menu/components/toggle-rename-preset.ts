import { MenuItem } from "obsidian";
import { t } from "src/graph-presets/lang/text";
type Props = {
	item: MenuItem;
	toggleRenamePreset: () => void;
};
export const ToggleRenamePreset = ({ item, toggleRenamePreset }: Props) => {
	item.setTitle(t.c.RENAME_PRESET);
	item.setIcon("edit");
	item.onClick(async () => {
		toggleRenamePreset();
	});
};
