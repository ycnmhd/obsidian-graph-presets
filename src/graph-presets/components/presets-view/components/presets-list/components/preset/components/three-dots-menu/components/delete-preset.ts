import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	item: MenuItem;
	meta: MarkdownPresetMeta;
};

export const DeletePreset = ({ item, meta }: Props) => {
	item.setTitle("Delete");
	item.setIcon("trash");
	item.onClick(async () => {
		await actions.deletePreset(meta);
	});
};
