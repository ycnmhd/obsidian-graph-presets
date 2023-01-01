import { ForceOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { Slider } from "../inputs/slider";

type Props = {
	options: ForceOptions;
	meta: MarkdownPresetMeta;
};

export const ForcesOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	return (
		<GroupContainer meta={meta} group="forces">
			<Slider
				name={"Center force"}
				value={options.centerStrength}
				min={0}
				max={1}
			/>
			<Slider
				name={"Repel force"}
				value={options.repelStrength}
				min={0}
				max={20}
			/>
			<Slider
				name={"Link force"}
				value={options.linkStrength}
				min={0}
				max={1}
			/>
			<Slider
				name={"Link distance"}
				value={options.linkDistance}
				min={30}
				max={500}
			/>
		</GroupContainer>
	);
};
