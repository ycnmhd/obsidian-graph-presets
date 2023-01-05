import { svgs } from "src/assets/svgs";
import { ColorGroupOptions } from "src/types/graph-settings";
import { rgbToHex } from "../../helpers/map-colors";
import { useInputState } from "./hooks/input-state";
import { UnsavedChangesIndicator } from "./shared/unsaved-changes-indicator";
import { SortableTextInput } from "./text-input/sortable-text-input";

type Props = {
	color: ColorGroupOptions["colorGroups"][number];
	onColorChange: (color: string) => void;
	onQueryChange: (query: string) => void;
	removeGroup: (query: string) => void;
	id: string | number;
};

export const ColorOption: React.FC<Props> = ({
	color,
	onColorChange,
	onQueryChange,
	removeGroup,
	id,
}) => {
	const { inputRef, unsavedChanges } = useInputState({
		onChangeDebounced: onColorChange,
		value: rgbToHex(color.color.rgb),
	});

	return (
		<SortableTextInput
			value={color.query}
			placeholder="Enter query..."
			onChange={onQueryChange}
			id={id}
		>
			<UnsavedChangesIndicator show={unsavedChanges} />
			{svgs["x-mark"]({
				"data-non-draggable": true,

				onClick: () => removeGroup(color.query),
				className:
					"absolute -right-4  rounded-full w-3 h-3 opacity-0 group-hover:opacity-100",
			})}

			<input ref={inputRef} type="color" className="absolute right-1" />
		</SortableTextInput>
	);
};
