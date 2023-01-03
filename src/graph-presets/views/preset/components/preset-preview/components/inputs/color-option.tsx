import { svgs } from "src/assets/svgs";
import { ColorGroupOptions } from "src/types/graph-settings";
import { rgbToHex } from "../../helpers/map-colors";
import { useInputState } from "./hooks/input-state";
import { TextInput } from "./text-input";

type Props = {
	color: ColorGroupOptions["colorGroups"][number];
	onColorChange: (color: string) => void;
	onQueryChange: (query: string) => void;
	removeGroup: (query: string) => void;
};

export const ColorOption: React.FC<Props> = ({
	color,
	onColorChange,
	onQueryChange,
	removeGroup,
}) => {
	const { inputRef } = useInputState({
		onChangeDebounced: onColorChange,
		value: rgbToHex(color.color.rgb),
	});

	return (
		<TextInput
			value={color.query}
			placeholder="Enter query..."
			onChange={onQueryChange}
			// only show the button on group hover
		>
			{svgs["x-mark"]({
				onClick: () => removeGroup(color.query),
				className:
					"absolute -right-3  rounded-full w-3 h-3 opacity-0 group-hover:opacity-100",
			})}

			<input ref={inputRef} type="color" className="absolute right-1" />
		</TextInput>
	);
};
