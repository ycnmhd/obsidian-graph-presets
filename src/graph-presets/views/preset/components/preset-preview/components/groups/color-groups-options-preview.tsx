import { GroupContainer } from "../group-container/group-container";
import { ColorGroupOptions } from "src/types/graph-settings";
import { ColorOption } from "../inputs/color-option";
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
			meta={meta}
			group="groups"
		>
			{options.colorGroups.map((color) => (
				<ColorOption color={color} key={color.color.rgb+color.query} />
			))}
		</GroupContainer>
	);
};
