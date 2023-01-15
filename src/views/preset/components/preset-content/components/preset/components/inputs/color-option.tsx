import { SortableTextInput } from "./text-input/sortable-text-input";
import { X } from "src/assets/svg/lucid/x";
import { ac } from "src/store/store";
import { ColorInput } from "src/views/preset/components/preset-content/components/preset/components/inputs/text-input/color-input";

type Props = {
	index: number;
	created: number;
	id: string | number;
};

export const ColorOption: React.FC<Props> = ({ id, index, created }) => {
	return (
		<SortableTextInput
			id={id}
			type={"color"}
			props={{
				index,
				created,
				placeholder: "Enter query...",
			}}
		>
			<div
				data-non-draggable={true}
				onClick={() => ac.removeColorGroup({ created, index })}
				className={
					"absolute -right-[18px]  rounded-full w-4 h-4 opacity-0 group-hover:opacity-60 hover:opacity-100"
				}
			>
				<X className={"w-4 h-4"} />
			</div>
			<ColorInput created={created} index={index} />
		</SortableTextInput>
	);
};
