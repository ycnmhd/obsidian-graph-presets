import { FilterOptions } from "src/types/graph-settings";
import { settingItemProps, sharedPreviewStyles } from "./shared-props";

type Props = {
	containerEl: HTMLElement;
	options: FilterOptions;
};
export const FilterOptionsPreview = ({ containerEl, options }: Props) => {
	const innerHTML = `
    <div class="tree-item graph-control-section mod-filter" ${sharedPreviewStyles}>
	<div class="tree-item-self mod-collapsible">
		
		<div class="tree-item-inner">
			<header class="graph-control-section-header">Filters</header>
		</div>
	</div>
	<div class="tree-item-children">
		<div class="setting-item mod-search-setting" ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name"></div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="search-input-container">
					<input
						enterkeyhint="search"
						type="search"
						spellcheck="false"
						placeholder="Search files..."
                        value='${options.search}'
                        disabled
					/>
					
				</div>
			</div>
		</div>
		<div class="setting-item mod-toggle"  ${settingItemProps}>
			<div class="setting-item-info">
				<div
					class="setting-item-name"
				
				>
					Tags
				</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="checkbox-container mod-small ${
					options.showTags ? "is-enabled" : ""
				}">
					<input type="checkbox" tabindex="0" disabled>
				</div>
			</div>
		</div>
		<div class="setting-item mod-toggle"  ${settingItemProps}>
			<div class="setting-item-info">
				<div class="setting-item-name">
					Attachments
				</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="checkbox-container mod-small ${
					options.showAttachments ? "is-enabled" : ""
				}">
					<input type="checkbox" tabindex="0"  disabled/>
				</div>
			</div>
		</div>
		<div class="setting-item mod-toggle" ${settingItemProps}>
			<div class="setting-item-info">
				<div
					class="setting-item-name"
				>
					Existing files only
				</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="checkbox-container mod-small ${
					options.hideUnresolved ? "is-enabled" : ""
				}">
					<input type="checkbox" tabindex="0" disabled />
				</div>
			</div>
		</div>
		<div class="setting-item mod-toggle"  ${settingItemProps}>
			<div class="setting-item-info">
				<div
					class="setting-item-name"
				>
					Orphans
				</div>
				<div class="setting-item-description"></div>
			</div>
			<div class="setting-item-control">
				<div class="checkbox-container mod-small ${
					options.showOrphans ? "is-enabled" : ""
				}">
					<input type="checkbox" tabindex="0" disabled />
				</div>
			</div>
		</div>
	</div>
</div>

    `;
	containerEl.insertAdjacentHTML("beforeend", innerHTML);
};
