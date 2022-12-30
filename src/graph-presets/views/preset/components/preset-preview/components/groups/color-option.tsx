import { ColorGroupOptions } from "src/types/graph-settings";
import { rgbToHex } from "../../helpers/map-colors";

type Props = {
	color: ColorGroupOptions["colorGroups"][number];
};

export const ColorOption: React.FC<Props> = ({ color }) => {
	return (
		<div className="graph-color-group">
			<input
				type="text"
				spellCheck="false"
				placeholder="Enter query..."
				value={color.query}
				disabled
			/>
			<input type="color" value={rgbToHex(color.color.rgb)} disabled />
		</div>
	);
};
