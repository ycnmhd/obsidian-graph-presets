import { DisplayOptions } from "src/types/graph-settings";
import { settingItemProps, sharedPreviewStyles } from "./shared-props";

type Props = {
	containerEl: HTMLElement;
	options: DisplayOptions;
};
export const DisplayOptionsPreview = ({ containerEl, options }: Props) => {
	const innerHTML = `
    <div class="tree-item graph-control-section mod-display" ${sharedPreviewStyles}>
	<div class="tree-item-self mod-collapsible">
	
		<div class="tree-item-inner">
			<header class="graph-control-section-header">Display</header>
		</div>
	</div>
	<div class="tree-item-children">
		<div class="setting-item mod-toggle" ${settingItemProps}>
			<div class="setting-item-info">
				<div
					class="setting-item-name"
				>
					Arrows
				</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="checkbox-container mod-small ${
					options.showArrow ? "mod-checked" : ""
				}">
					<input type="checkbox" tabindex="0" disabled/>
				</div>
			</div>
		</div>
		<div class="setting-item mod-slider" ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Text fade threshold</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input
					class="slider"
					type="range"
					min="-3"
					max="3"
					step="0.1"
                    value="${options.textFadeMultiplier}"
                    disabled
				/>
			</div>
		</div>
		<div class="setting-item mod-slider" ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Node size</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input
					class="slider"
					type="range"
					min="0.1"
					max="5"
					step="any"
                    value="${options.nodeSizeMultiplier}"
                    disabled
				/>
			</div>
		</div>
		<div class="setting-item mod-slider" ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">Link thickness</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<input
					class="slider"
					type="range"
					min="0.1"
					max="5"
					step="any"
                    value="${options.lineSizeMultiplier}"
                    disabled
				/>
			</div>
		</div>
		
	</div>
</div>
`;

	containerEl.insertAdjacentHTML("beforeend", innerHTML);
};
