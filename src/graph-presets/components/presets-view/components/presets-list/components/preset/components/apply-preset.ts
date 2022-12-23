import { actions } from "src/graph-presets/actions/actions";

type Props = {
	controls: HTMLElement;
	renderList: () => void;
	presetName: string;
};
export const ApplyPreset = ({ controls, presetName, renderList }: Props) => {
	const applyButton = controls.createEl("button", {
		text: "Apply",
		cls: "mod-cta",
	});
	applyButton.addEventListener("click", () => {
		actions.applyPreset(presetName);
		setTimeout(renderList, 2000);
	});
};
