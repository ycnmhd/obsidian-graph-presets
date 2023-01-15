import { GroupContainer } from "../group-container/group-container";
import { Slider } from "../inputs/slider";
import { GroupProps } from "./filter-options-preview";

export const ForcesOptionsPreview: React.FC<GroupProps> = ({ created }) => {
	return (
		<GroupContainer created={created} group="forces">
			<Slider name={"centerStrength"} created={created} />
			<Slider name={"repelStrength"} created={created} />
			<Slider name={"linkStrength"} created={created} />
			<Slider name={"linkDistance"} created={created} />
		</GroupContainer>
	);
};
