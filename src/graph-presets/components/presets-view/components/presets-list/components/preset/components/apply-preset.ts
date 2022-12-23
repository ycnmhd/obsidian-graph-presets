import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";

type Props = {
	controls: HTMLElement;
	renderList: () => void;
	presetName: string;
	togglePreview: () => boolean;
};
export const ApplyPreset = ({
	controls,
	presetName,
	renderList,
	togglePreview,
}: Props) => {
	const applyButton = controls.createEl("button", {
		text: "Apply",
		cls: "mod-cta",
	});

	const togglePreviewButton = controls.createEl("button", {
		cls: "mod-cta",
	});
	togglePreviewButton.innerHTML = svgs["chevron-down"];

	togglePreviewButton.addEventListener("click", () => {
		const showPreview = togglePreview();
		if (showPreview) {
			togglePreviewButton.innerHTML = svgs["chevron-up"];
		} else {
			togglePreviewButton.innerHTML = svgs["chevron-down"];
		}
	});

	applyButton.addEventListener("click", () => {
		actions.applyPreset(presetName);
		setTimeout(renderList, 2000);
	});
};
