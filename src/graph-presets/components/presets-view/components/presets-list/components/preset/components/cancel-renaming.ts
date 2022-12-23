import { svgs } from "src/assets/svgs";
import { DeleteItem } from "./three-dots-menu/components/delete-preset";
import { RenderItem } from "./three-dots-menu/components/toggle-rename-preset";

type Props = {
	controls: HTMLElement;
	deleteItem: DeleteItem;
	reRenderItem: RenderItem;
	presetName: string;
};
export const CancelRenaming = ({
	controls,
	deleteItem,
	reRenderItem,
	presetName,
}: Props) => {
	const cancelButton = controls.createEl("button", {});
	cancelButton.innerHTML = svgs["x-circle"];
	cancelButton.addEventListener("click", () => {
		if (!presetName) {
			deleteItem();
		} else {
			reRenderItem();
		}
	});
};
