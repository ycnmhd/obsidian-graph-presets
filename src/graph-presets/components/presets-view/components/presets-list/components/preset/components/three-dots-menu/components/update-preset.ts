import { MenuItem } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	item: MenuItem;
	meta: MarkdownPresetMeta
};

export const UpdatePreset = ({ item, meta }: Props) => {
	item.setTitle(t.c.UPDATE_PRESET);
	item.setIcon("edit");
	item.onClick(async () => {
		await actions.updatePreset(meta);
	});
};
