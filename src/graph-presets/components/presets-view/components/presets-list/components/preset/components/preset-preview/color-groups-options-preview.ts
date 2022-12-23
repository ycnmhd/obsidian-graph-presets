import { ColorGroupOptions } from "src/types/graph-settings";
import { RenderItem } from "../three-dots-menu/components/toggle-rename-preset";
import { sharedPreviewStyles } from "./shared-props";
import { groupPreview } from "./components/group-preview";

const mapValueToRGB = (value: number) => {
	const hex = value.toString(16);
	return `#${hex.padStart(6, "0")}`;
};

const colorOption = (color: ColorGroupOptions["colorGroups"][number]) => `
<div class="graph-color-group">
	<input type="text" spellcheck="false" placeholder="Enter query..." value='${
		color.query
	}' disabled/>
	<input
		type="color"
		
value="${mapValueToRGB(color.color.rgb)}"
disabled

	/>
	
</div>`;

type Props = {
	containerEl: HTMLElement;
	options: ColorGroupOptions;
	presetName: string;
	renderItem: RenderItem;
};

export const ColorGroupsOptionsPreview = ({
	containerEl,
	options,
	presetName,
	renderItem,
}: Props) => {
	const html = `
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

	groupPreview({
		html,
		containerEl,
		group: "color-groups",
		presetName,
		renderItem,
	});
};
