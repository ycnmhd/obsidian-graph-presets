import { DisplayOptions } from "src/types/graph-settings";
import { settingItemProps } from "../group-container/shared-props";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	options: DisplayOptions;
	meta: MarkdownPresetMeta;
};

export const DisplayOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	return (
		<GroupContainer className="mod-display" meta={meta} group="display">
			<div className="tree-item-self mod-collapsible">
				<div className="tree-item-inner">
					<header className="graph-control-section-header">
						Display
					</header>
				</div>
			</div>
			<div className="tree-item-children">
				<div
					className="setting-item mod-toggle"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Arrows</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<div
							className={`checkbox-container mod-small ${
								options.showArrow ? "is-enabled" : ""
							}`}
						>
							<input type="checkbox" tabIndex={0} disabled />
						</div>
					</div>
				</div>
				<div
					className="setting-item mod-slider"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">
							Text fade threshold
						</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<input
							className="slider"
							type="range"
							min="-3"
							max="3"
							step="0.1"
							value={`${options.textFadeMultiplier}`}
							disabled
						/>
					</div>
				</div>
				<div
					className="setting-item mod-slider"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Node size</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<input
							className="slider"
							type="range"
							min="0.1"
							max="5"
							step="any"
							value={`${options.nodeSizeMultiplier}`}
							disabled
						/>
					</div>
				</div>
				<div
					className="setting-item mod-slider"
					style={settingItemProps}
				>
					<div className="setting-item-info">
						<div className="setting-item-name">Link thickness</div>
						<div className="setting-item-description"></div>
					</div>
					<div className="setting-item-control">
						<input
							className="slider"
							type="range"
							min="0.1"
							max="5"
							step="any"
							value={`${options.lineSizeMultiplier}`}
							disabled
						/>
					</div>
				</div>
			</div>
		</GroupContainer>
	);
};
