import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { UpdatePreset } from "./components/update-preset";
import {
	RenderItem,
	ToggleRenamePreset,
} from "./components/toggle-rename-preset";
import { DeletePreset, DeleteItem } from "./components/delete-preset";

type Props = {
	listItem: HTMLElement;
	presetName: string;
	reRenderItem: RenderItem;
	deleteItem: DeleteItem;
};
export const ThreeDotsMenu = ({
	listItem,
	presetName,
	reRenderItem,
	deleteItem
}: Props) => {
	const controls = listItem.querySelector(
		".setting-item-control"
	) as HTMLElement;
	const button = controls.createEl("button");
	button.innerHTML = svgs["ellipsis-vertical"];
	button.addEventListener("click", (event) => {
		const menu = new Menu();
		menu.addItem((item) =>
			UpdatePreset({ item, presetName, reRenderItem })
		);

		menu.addItem((item) => ToggleRenamePreset({ item, reRenderItem }));
		menu.addItem((item) =>
			DeletePreset({ item, presetName, deleteItem })
		);
		menu.showAtMouseEvent(event);
	});
};
