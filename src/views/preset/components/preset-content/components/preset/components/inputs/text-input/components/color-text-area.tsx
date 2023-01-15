import { useAutoSize } from "src/views/preset/components/preset-content/components/preset/components/inputs/hooks/auto-size";
import { useAppSelector } from "src/store/hooks";
import { ac } from "src/store/store";
import { ChangeEvent, useCallback } from "react";

export type ColorTextAreaProps = {
	created: number;
	index: number;
	placeholder?: string;
};
export const ColorTextArea = ({
	created,
	index,
	placeholder,
}: ColorTextAreaProps) => {
	const value = useAppSelector(
		(state) => state.preset.presets[created].colorGroups[index].query
	) as string;
	const { inputRef, autoSize } = useAutoSize(value);
	const onChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			ac.updateColorQuery({
				created,
				index,
				query: e.target.value,
			});
		},
		[created, index]
	);
	return (
		<textarea
			onKeyDown={autoSize as any}
			ref={inputRef as any}
			style={{
				resize: "none",
				overflow: "hidden",
				padding: "10px 25px",
				width: "100%",
				minHeight: 37,
			}}
			onChange={onChange}
			value={value}
			spellCheck="false"
			placeholder={placeholder}
			cols={1}
			rows={1}
		/>
	);
};
