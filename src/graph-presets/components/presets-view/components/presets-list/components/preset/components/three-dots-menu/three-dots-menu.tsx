import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { UpdatePreset } from "./components/update-preset";
import { ToggleRenamePreset } from "./components/toggle-rename-preset";
import { DeletePreset } from "./components/delete-preset";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	meta: MarkdownPresetMeta;
	toggleRenamePreset: () => void;
};

export const ThreeDotsMenu: React.FC<Props> = ({
	meta,
	toggleRenamePreset,
}) => {
	return (
		<button
			onClick={(event) => {
				const menu = new Menu();
				menu.addItem((item) => UpdatePreset({ item, meta }));

				menu.addItem((item) =>
					ToggleRenamePreset({ item, toggleRenamePreset })
				);
				menu.addItem((item) => DeletePreset({ item, meta }));
				menu.showAtMouseEvent(event as any as MouseEvent);
			}}
			aria-label={t.c.MORE_OPTIONS}
		>
			{svgs["ellipsis-vertical"]()}
		</button>
	);
};
