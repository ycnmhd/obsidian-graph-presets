import { ThreeDotsMenu } from "./components/three-dots-menu/three-dots-menu";
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { RenderItem } from "./components/three-dots-menu/components/toggle-rename-preset";
import { DeleteItem } from "./components/three-dots-menu/components/delete-preset";
import { SavePreset } from "./components/save-preset";
import { PresetLabel } from "./components/preset-label";

type Props = {
	listItem: HTMLElement;
	presetName: string;
	editing?: boolean;
	renderList: () => void;
};

export const Preset = async ({
	listItem,
	presetName,
	editing,
	renderList,
}: Props) => {
	const reRenderItem: RenderItem = (props = {}) => {
		listItem.empty();
		Preset({
			listItem,
			presetName: props.presetName || presetName,
			editing: props.editing,
			renderList,
		});
	};
	const deleteItem: DeleteItem = () => {
		listItem.remove();
	};

	const info = listItem.createEl("div", {
		cls: "setting-item-info",
	});
	const controls = listItem.createEl("div", {
		cls: "setting-item-control",
	});

	PresetLabel({ info, presetName });

	if (editing || presetName === "") {
		controls.createEl("input", {
			value: presetName,
			type: "text",
			placeholder: "Preset name",
		});
		SavePreset({
			controls,
			getInputValue: () =>
				(controls.querySelector("input") as HTMLInputElement).value,
			presetName,
			reRenderItem,
		});

		CancelRenaming({
			controls,
			deleteItem,
			reRenderItem,
			presetName,
		});
	} else {
		ApplyPreset({ controls, presetName, renderList });
		ThreeDotsMenu({ deleteItem, listItem, presetName, reRenderItem });
	}
};
