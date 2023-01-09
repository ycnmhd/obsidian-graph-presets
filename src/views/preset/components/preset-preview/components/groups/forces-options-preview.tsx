import { ForceOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets";
import { Slider } from "../inputs/slider";
import { UpdateAttribute } from "src/views/preset/preset-view";

type Props = {
	options: ForceOptions;
	meta: MarkdownPresetMeta;
	updateAttribute: UpdateAttribute;
};

export const ForcesOptionsPreview: React.FC<Props> = ({
	options,
	meta,
	updateAttribute,
}) => {
	return (
		<GroupContainer
			meta={meta}
			group="forces"
			collapsed={options["collapse-forces"]}
			updateAttribute={updateAttribute}
		>
			<Slider
				name={"centerStrength"}
				value={options.centerStrength}
				min={0}
				max={1}
				onChange={updateAttribute}
			/>
			<Slider
				name={"repelStrength"}
				value={options.repelStrength}
				min={0}
				max={20}
				onChange={updateAttribute}
			/>
			<Slider
				name={"linkStrength"}
				value={options.linkStrength}
				min={0}
				max={1}
				onChange={updateAttribute}
			/>
			<Slider
				name={"linkDistance"}
				value={options.linkDistance}
				min={30}
				max={500}
				onChange={updateAttribute}
			/>
		</GroupContainer>
	);
};
