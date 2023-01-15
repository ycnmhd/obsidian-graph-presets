import { GroupContainer } from "../group-container/group-container";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";
import { GroupProps } from "./filter-options-preview";

export const DisplayOptionsPreview: React.FC<GroupProps> = ({ created }) => {
	return (
		<GroupContainer created={created} group="display">
			<Toggle name="showArrow" created={created} />
			<Slider name="textFadeMultiplier" created={created} />
			<Slider name="nodeSizeMultiplier" created={created} />
			<Slider name="lineSizeMultiplier" created={created} />
		</GroupContainer>
	);
};
