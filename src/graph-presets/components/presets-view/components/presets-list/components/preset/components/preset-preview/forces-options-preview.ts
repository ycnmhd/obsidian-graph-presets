import { ForceOptions } from "src/types/graph-settings";
import { RenderItem } from "../three-dots-menu/components/toggle-rename-preset";
import { settingItemProps, sharedPreviewStyles } from "./shared-props";
import { groupPreview } from "./components/group-preview";

type Props = {
	containerEl: HTMLElement;
	options: ForceOptions;
	presetName: string;
	renderItem: RenderItem;
};
export const ForcesOptionsPreview = ({
	containerEl,
	options,
	presetName,
	renderItem,
}: Props) => {
	const html = `<div class="tree-item graph-control-section mod-forces" ${sharedPreviewStyles}>
	<div class="tree-item-self mod-collapsible">
		
		<div class="tree-item-inner">
			<header class="graph-control-section-header">Forces</header>
		</div>
	</div>
	<div class="tree-item-children">
		<div class="setting-item mod-slider"  ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Center force</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input class="slider" type="range" min="0" max="1" step="any" value="${options.centerStrength}" disabled />
			</div>
		</div>
		<div class="setting-item mod-slider"  ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Repel force</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input
					class="slider"
					type="range"
					min="0"
					max="20"
					step="any"
                    value="${options.repelStrength}"
                    disabled
				/>
			</div>
		</div>
		<div class="setting-item mod-slider"  ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Link force</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input class="slider" type="range" min="0" max="1" step="any" value="${options.linkStrength}" disabled/>
			</div>
		</div>
		<div class="setting-item mod-slider"  ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Link distance</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input
					class="slider"
					type="range"
					min="30"
					max="500"
					step="1"
                    value="${options.linkDistance}"
                    disabled
				/>
			</div>
		</div>
	</div>
</div>
`;

	groupPreview({
		html,
		containerEl,
		group: "forces",
		presetName,
		renderItem,
	});
};