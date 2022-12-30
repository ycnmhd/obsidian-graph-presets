import { GroupContainer } from "../group-container/group-container";
import { ColorGroupOptions } from "src/types/graph-settings";
import { ColorOption } from "./color-option";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
type Props = {
	options: ColorGroupOptions;
	meta: MarkdownPresetMeta;
};

export const ColorGroupsOptionsPreview: React.FC<Props> = ({
	options,
	meta,
}) => {
	return (
		<GroupContainer
			className=" mod-color-groups"
			meta={meta}
			group="groups"
		>
			<div className="tree-item-self mod-collapsible">
				<div className="tree-item-inner">
					<header className="graph-control-section-header">
						Groups
					</header>
				</div>
			</div>
			<div className="tree-item-children">
				<div className="graph-color-groups-container">
					{options.colorGroups.map((color) => (
						<ColorOption color={color} key={color.color.rgb} />
					))}
				</div>
			</div>
		</GroupContainer>
	);
};
