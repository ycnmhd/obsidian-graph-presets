import { actions } from "src/graph-presets/actions/actions";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { RenderItem } from "../../three-dots-menu/components/toggle-rename-preset";

type Props = {
	html: string;
	containerEl: HTMLElement;
	presetName: string;
	group: graphSettingsGroup;
	renderItem: RenderItem;
};
export const groupPreview = ({
	containerEl,
	group,
	html,
	presetName,
	renderItem,
}: Props) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const htmlContainer = doc.body.firstChild as HTMLElement;

	htmlContainer.style.position = "relative";
	const buttonsContainer = htmlContainer.createEl("div", {
		attr: {
			style: `
            display: none; 
            flex-direction: row; 
            justify-content: center; 
            align-items: center; 
            gap: 5px;
            width: 100%; 
            position: absolute; 
            bottom: 0; 
            left: 0; 
            height: 50px; 
         
            backdrop-filter: blur(5px);`,
		},
	});
	const applyButton = buttonsContainer.createEl("button", {
		cls: "mod-cta",
		text: "Apply",
		attr: {
			style: `width: 70px;`,
		},
	});

	applyButton.addEventListener("click", (e) => {
			e.stopPropagation();
		actions.applyPreset(presetName, group);
	});

	const updateButton = buttonsContainer.createEl("button", {
		cls: "mod-cta",
		text: "Update",
		attr: {
			style: `width: 70px;`,
		},
	});
	updateButton.addEventListener("click", (e) => {
		e.stopPropagation();

		actions.updatePreset(presetName, group);
		setTimeout(() => {
			renderItem();
		}, 500);
	});

	htmlContainer.addEventListener("mouseenter", () => {
		buttonsContainer.style.display = "flex";
	});
	htmlContainer.addEventListener("mouseleave", () => {
		buttonsContainer.style.display = "none";
	});
	htmlContainer.addEventListener("click", () => {
		buttonsContainer.style.display = "none";
	});

	containerEl.appendChild(htmlContainer);
};
