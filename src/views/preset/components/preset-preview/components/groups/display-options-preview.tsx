import { DisplayOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";
import { UpdateAttribute } from "src/views/preset/preset-view";

type Props = {
	options: DisplayOptions;
	meta: MarkdownPresetMeta;
	updateAttribute: UpdateAttribute;
};

export const DisplayOptionsPreview: React.FC<Props> = ({
	options,
	meta,
	updateAttribute,
}) => {
	return (
		<GroupContainer
			meta={meta}
			group="display"
			collapsed={options["collapse-display"]}
			updateAttribute={updateAttribute}
		>
			<Toggle
				enabled={options.showArrow}
				name="showArrow"
				onChange={updateAttribute}
			/>
			<Slider
				name="textFadeMultiplier"
				value={options.textFadeMultiplier}
				min={-3}
				max={3}
				// step={0.1}
				onChange={updateAttribute}
			/>
			<Slider
				name="nodeSizeMultiplier"
				value={options.nodeSizeMultiplier}
				min={0.1}
				max={5}
				onChange={updateAttribute}
			/>
			<Slider
				name="lineSizeMultiplier"
				value={options.lineSizeMultiplier}
				min={0.1}
				max={5}
				onChange={updateAttribute}
			/>
		</GroupContainer>
	);
};
