import { mapValueToRGB } from "./helpers/map-color-to-rgb";
import { ColorGroupOptions } from "src/types/graph-settings";

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
			<input
				type="color"
				value={mapValueToRGB(color.color.rgb)}
				disabled
			/>
		</div>
	);
};
