import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { UpdatePreset } from "./components/update-preset";
import { ToggleRenamePreset } from "./components/toggle-rename-preset";
import { DeletePreset } from "./components/delete-preset";

type Props = {
	presetName: string;
	toggleRenamePreset: () => void;
};

export const ThreeDotsMenu: React.FC<Props> = ({
	presetName,
	toggleRenamePreset,
}) => {
	return (
		<button
			onClick={(event) => {
				const menu = new Menu();
				menu.addItem((item) => UpdatePreset({ item, presetName }));

				menu.addItem((item) =>
					ToggleRenamePreset({ item, toggleRenamePreset })
				);
				menu.addItem((item) => DeletePreset({ item, presetName }));
				menu.showAtMouseEvent(event as any as MouseEvent);
			}}
		>
			{svgs["ellipsis-vertical"]}
		</button>
	);
};
