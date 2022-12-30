import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	item: MenuItem;
	meta: MarkdownPresetMeta
};

export const UpdatePreset = ({ item, meta }: Props) => {
	item.setTitle("Update");
	item.setIcon("edit");
	item.onClick(async () => {
		await actions.updatePreset(meta);
	});
};
