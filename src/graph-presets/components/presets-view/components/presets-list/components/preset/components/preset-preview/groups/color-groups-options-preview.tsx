import { GroupContainer } from "../group-container/group-container";
import { ColorGroupOptions } from "src/types/graph-settings";
import { ColorOption } from "./color-option";
type Props = {
	options: ColorGroupOptions;
	presetName: string;
};

export const ColorGroupsOptionsPreview: React.FC<Props> = ({
	options,
	presetName,
}) => {
	return (
		<GroupContainer
			className=" mod-color-groups"
			presetName={presetName}
			group="color-groups"
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
						<ColorOption color={color} key={color.color.rgb}/>
					))}
				</div>
			</div>
		</GroupContainer>
	);
};
