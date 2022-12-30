import { FilterOptions } from "src/types/graph-settings";
import { settingItemProps } from "../group-container/shared-props";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	options: FilterOptions;
	meta: MarkdownPresetMeta;
};

export const FilterOptionsPreview: React.FC<Props> = ({
	options,
	meta,
}) => {
	return (
		<GroupContainer
			className="mod-filter"
			meta={meta}
			group="filters"
		>
			<div className="tree-item-self mod-collapsible">
				<div className="tree-item-inner">
					<header className="graph-control-section-header">
						Filters
					</header>
				</div>
			</div>
			<div className="tree-item-children">
				<div
					className="setting-item mod-search-setting"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name"></div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div className="search-input-container">
							<input
								enterKeyHint="search"
								type="search"
								spellCheck="false"
								placeholder="Search files..."
								value={`${options.search}`}
								disabled
							/>
						</div>
					</div>
				</div>
				<div
					className="setting-item mod-toggle"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Tags</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div
							className={`checkbox-container mod-small ${
								options.showTags ? "is-enabled" : ""
							}`}
						>
							<input type="checkbox" tabIndex={0} disabled />
						</div>
					</div>
				</div>
				<div
					className="setting-item mod-toggle"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Attachments</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div
							className={`checkbox-container mod-small ${
								options.showAttachments ? "is-enabled" : ""
							}`}
						>
							<input type="checkbox" tabIndex={0} disabled />
						</div>
					</div>
				</div>
				<div
					className="setting-item mod-toggle"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">
							Existing files only
						</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div
							className={`checkbox-container mod-small ${
								options.hideUnresolved ? "is-enabled" : ""
							}`}
						>
							<input type="checkbox" tabIndex={0} disabled />
						</div>
					</div>
				</div>
				<div
					className="setting-item mod-toggle"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Orphans</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div
							className={`checkbox-container mod-small ${
								options.showOrphans ? "is-enabled" : ""
							}`}
						>
							<input type="checkbox" tabIndex={0} disabled />
						</div>
					</div>
				</div>
			</div>
		</GroupContainer>
	);
};
