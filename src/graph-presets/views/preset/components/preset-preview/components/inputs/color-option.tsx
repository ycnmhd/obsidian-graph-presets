import { ColorGroupOptions } from "src/types/graph-settings";
import { rgbToHex } from "../../helpers/map-colors";
import { TextInput } from "./text-input";

type Props = {
	color: ColorGroupOptions["colorGroups"][number];
};

export const ColorOption: React.FC<Props> = ({ color }) => {
	return (
		<TextInput value={color.query} placeholder="Enter query...">
			<input
				type="color"
				value={rgbToHex(color.color.rgb)}
				className="absolute right-1"
			/>
		</TextInput>
	);
};
