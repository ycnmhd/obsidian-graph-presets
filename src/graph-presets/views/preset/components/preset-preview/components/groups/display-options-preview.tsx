import { DisplayOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";

type Props = {
	options: DisplayOptions;
	meta: MarkdownPresetMeta;
};

export const DisplayOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	return (
		<GroupContainer meta={meta} group="display">
			<Toggle enabled={options.showArrow} name="Arrows" />
			<Slider
				name="Text fade threshold"
				value={options.textFadeMultiplier}
				min={-3}
				max={3}
				step={0.1}
			/>
			<Slider
				name="Node size"
				value={options.nodeSizeMultiplier}
				min={0.1}
				max={5}
			/>
			<Slider
				name="Link thickness"
				value={options.lineSizeMultiplier}
				min={0.1}
				max={5}
			/>
		</GroupContainer>
	);
};
