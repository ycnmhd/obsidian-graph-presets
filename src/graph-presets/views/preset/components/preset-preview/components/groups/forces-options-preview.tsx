import { ForceOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { Slider } from "../inputs/slider";
import { useOnChange } from "../inputs/hooks/on-change";

type Props = {
	options: ForceOptions;
	meta: MarkdownPresetMeta;
};

export const ForcesOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	const updateCenterStrength = useOnChange(meta.created, "centerStrength");
	const updateRepelStrength = useOnChange(meta.created, "repelStrength");
	const updateLinkStrength = useOnChange(meta.created, "linkStrength");
	const updateLinkDistance = useOnChange(meta.created, "linkDistance");
	return (
		<GroupContainer meta={meta} group="forces">
			<Slider
				name={"Center force"}
				value={options.centerStrength}
				min={0}
				max={1}
				onChange={updateCenterStrength}
			/>
			<Slider
				name={"Repel force"}
				value={options.repelStrength}
				min={0}
				max={20}
				onChange={updateRepelStrength}
			/>
			<Slider
				name={"Link force"}
				value={options.linkStrength}
				min={0}
				max={1}
				onChange={updateLinkStrength}
			/>
			<Slider
				name={"Link distance"}
				value={options.linkDistance}
				min={30}
				max={500}
				onChange={updateLinkDistance}
			/>
		</GroupContainer>
	);
};
