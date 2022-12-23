import { ThreeDotsMenu } from "./components/three-dots-menu/three-dots-menu";
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { RenderItem } from "./components/three-dots-menu/components/toggle-rename-preset";
import { DeleteItem } from "./components/three-dots-menu/components/delete-preset";
import { SavePreset } from "./components/save-preset";
import { PresetLabel } from "./components/preset-label";
import { PresetPreview } from "./components/preset-preview/preset-preview";

type Props = {
	listItem: HTMLElement;
	presetName: string;
	editing?: boolean;
	renderList: () => void;
	showPreview?: boolean;
};

export const Preset = async ({
	listItem,
	presetName,
	editing,
	renderList,
	showPreview = false,
}: Props) => {
	const mainDiv = listItem.createEl("div", {
		cls: "setting-item",
	});
	const previewDiv = listItem.createEl("div");
	const info = mainDiv.createEl("div", {
		cls: "setting-item-info",
	});
	const controls = mainDiv.createEl("div", {
		cls: "setting-item-control",
	});
	const state = {
		showPreview: showPreview,
	};
	const reRenderItem: RenderItem = (props = {}) => {
		listItem.empty();
		Preset({
			listItem,
			presetName: props.presetName || presetName,
			editing: props.editing,
			renderList,
			showPreview: state.showPreview,
		});
	};
	const togglePreview = () => {
		state.showPreview = !state.showPreview;
		if (state.showPreview)
			PresetPreview({
				containerEl: previewDiv,
				presetName,
				renderItem: reRenderItem,
			});
		else previewDiv.empty();
		return state.showPreview;
	};
	if (state.showPreview)
		PresetPreview({
			containerEl: previewDiv,
			presetName,
			renderItem: reRenderItem,
		});

	const deleteItem: DeleteItem = () => {
		listItem.remove();
	};

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
		ApplyPreset({
			controls,
			presetName,
			renderList,
			togglePreview,
		});
		ThreeDotsMenu({ deleteItem, listItem, presetName, reRenderItem });
	}
};
