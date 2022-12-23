import { ColorGroupOptions } from "src/types/graph-settings";
import { sharedPreviewStyles } from "./shared-props";

const mapValueToRGB = (value: number) => {
	const hex = value.toString(16);
	return `#${hex.padStart(6, "0")}`;
};

type Props = {
	containerEl: HTMLElement;
	options: ColorGroupOptions;
};

const colorOption = (color: ColorGroupOptions["colorGroups"][number]) => `
<div class="graph-color-group">
	<input type="text" spellcheck="false" placeholder="Enter query..." value="${
		color.query
	} " disabled/>
	<input
		type="color"
		
value="${mapValueToRGB(color.color.rgb)}"
disabled

	/>
	
</div>`;
export const ColorGroupsOptionsPreview = ({ containerEl, options }: Props) => {
	const innerHTML = `
    <div class="tree-item graph-control-section mod-color-groups" ${sharedPreviewStyles}>
	<div class="tree-item-self mod-collapsible">
		
		<div class="tree-item-inner">
			<header class="graph-control-section-header">Groups</header>
		</div>
	</div>
	<div class="tree-item-children">
		<div class="graph-color-groups-container">
			${options.colorGroups.map(colorOption).join("")}
		</div>
		
	</div>
</div>

    `;

	containerEl.insertAdjacentHTML("beforeend", innerHTML);
};
