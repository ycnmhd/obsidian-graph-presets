import { actions } from "src/graph-presets/actions/actions";
import { RenderItem } from "./three-dots-menu/components/toggle-rename-preset";

type Props = {
	controls: HTMLElement;
	presetName: string;
	reRenderItem: RenderItem;
	getInputValue: () => string;
};
export const SavePreset = ({
	controls,
	reRenderItem,
	presetName,
	getInputValue,
}: Props) => {
	const saveButton = controls.createEl("button", {
		text: "Save",
		cls: "mod-cta",
	});

	saveButton.addEventListener("click", () => {
		const value = getInputValue();
		if (!value) return;
		if (presetName) actions.renamePreset(presetName, value);
		else actions.createPreset(value);
		reRenderItem({presetName:value, editing: false});
	});
};
