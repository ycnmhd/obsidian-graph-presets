import * as React from "react";
import { useAutoSize } from "src/views/preset/components/preset-content/components/preset/components/inputs/hooks/auto-size";
import { useAppSelector } from "src/store/hooks";
import { GraphSettings } from "src/types/graph-settings";
import { ac } from "src/store/store";
import { useCallback } from "react";

export type SimpleTextAreaProps = {
	name: keyof GraphSettings;
	created: number;
	placeholder?: string;
};
export const SimpleTextArea = ({
	name,
	created,
	placeholder,
}: SimpleTextAreaProps) => {
	const value = useAppSelector(
		(state) => state.preset.presets[created][name]
	) as string;
	const { inputRef, autoSize } = useAutoSize(value);
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			ac.updateAttribute({ created, name, value: e.target.value });
		},
		[created, name]
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
