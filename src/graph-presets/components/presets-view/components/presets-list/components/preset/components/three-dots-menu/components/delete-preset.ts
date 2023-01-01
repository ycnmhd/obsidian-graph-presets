import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	item: MenuItem;
	meta: MarkdownPresetMeta;
};

export const DeletePreset = ({ item, meta }: Props) => {
	item.setTitle(t.c.DELETE_PRESET);
	item.setIcon("trash");
	item.onClick(async () => {
		await actions.deletePreset(meta);
	});
};
