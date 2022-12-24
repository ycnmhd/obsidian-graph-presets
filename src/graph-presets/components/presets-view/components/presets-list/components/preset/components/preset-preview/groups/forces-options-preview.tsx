import { ForceOptions } from "src/types/graph-settings";
import { settingItemProps } from "../group-container/shared-props";
import { GroupContainer } from "../group-container/group-container";

type Props = {
	options: ForceOptions;
	presetName: string;
};

export const ForcesOptionsPreview: React.FC<Props> = ({
	options,
	presetName,
}) => {
	return (
		<GroupContainer
			className="mod-forces"
			presetName={presetName}
			group="forces"
		>
			<div>
				<div className="tree-item-self mod-collapsible">
					<div className="tree-item-inner">
						<header className="graph-control-section-header">
							Forces
						</header>
					</div>
				</div>
				<div className="tree-item-children">
					<div
						className="setting-item mod-slider"
						style={settingItemProps}
					>
						<div className="setting-item-info">
							<div className="setting-item-name">
								Center force
							</div>
							<div className="setting-item-description"></div>
						</div>
						<div className="setting-item-control">
							<input
								className="slider"
								type="range"
								min="0"
								max="1"
								step="any"
								value={options.centerStrength}
								disabled
							/>
						</div>
					</div>
					<div
						className="setting-item mod-slider"
						style={settingItemProps}
					>
						<div className="setting-item-info">
							<div className="setting-item-name">Repel force</div>
							<div className="setting-item-description"></div>
						</div>
						<div className="setting-item-control">
							<input
								className="slider"
								type="range"
								min="0"
								max="20"
								step="any"
								value={options.repelStrength}
								disabled
							/>
						</div>
					</div>
					<div
						className="setting-item mod-slider"
						style={settingItemProps}
					>
						<div className="setting-item-info">
							<div className="setting-item-name">Link force</div>
							<div className="setting-item-description"></div>
						</div>
						<div className="setting-item-control">
							<input
								className="slider"
								type="range"
								min="0"
								max="1"
								step="any"
								value={options.linkStrength}
								disabled
							/>
						</div>
					</div>
					<div
						className="setting-item mod-slider"
						style={settingItemProps}
					>
						<div className="setting-item-info">
							<div className="setting-item-name">
								Link distance
							</div>
							<div className="setting-item-description"></div>
						</div>
						<div className="setting-item-control">
							<input
								className="slider"
								type="range"
								min="30"
								max="500"
								step="1"
								value={options.linkDistance}
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</GroupContainer>
	);
};
