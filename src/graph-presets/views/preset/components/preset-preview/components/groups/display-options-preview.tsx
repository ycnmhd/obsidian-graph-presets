import { DisplayOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";
import { useOnChange } from "../inputs/hooks/on-change";

type Props = {
	options: DisplayOptions;
	meta: MarkdownPresetMeta;
};

export const DisplayOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	const onShowArrowChange = useOnChange(meta.created, "showArrow");
	const onTextFadeChange = useOnChange(meta.created, "textFadeMultiplier");
	const onNodeSizeChange = useOnChange(meta.created, "nodeSizeMultiplier");
	const onLineSizeChange = useOnChange(meta.created, "lineSizeMultiplier");

	return (
		<GroupContainer meta={meta} group="display">
			<Toggle
				enabled={options.showArrow}
				name="Arrows"
				onChange={onShowArrowChange}
			/>
			<Slider
				name="Text fade threshold"
				value={options.textFadeMultiplier}
				min={-3}
				max={3}
				// step={0.1}
				onChange={onTextFadeChange}
			/>
			<Slider
				name="Node size"
				value={options.nodeSizeMultiplier}
				min={0.1}
				max={5}
				onChange={onNodeSizeChange}
			/>
			<Slider
				name="Link thickness"
				value={options.lineSizeMultiplier}
				min={0.1}
				max={5}
				onChange={onLineSizeChange}
			/>
		</GroupContainer>
	);
};
