import { useEffect, useRef, useState } from "react";
import { actions } from "src/graph-presets/actions/actions";
import { t } from "src/graph-presets/lang/text";

export const searchInputHeight = 38;
type Props = {
	currentValue: string;
};

export const SearchInput: React.FC<Props> = ({ currentValue = "" }) => {
	const [value, setValue] = useState(currentValue);

	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	useEffect(() => {
		if (value !== currentValue) {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				actions.setFilter(value);
			}, 200);
			return () => clearTimeout(timeoutRef.current);
		}
	}, [value, currentValue]);
	return (
		<div
			className="search-input-container"
			style={{ height: searchInputHeight }}
		>
			<input
				enterKeyHint="search"
				type="search"
				spellCheck="false"
				placeholder={t.c.FILTER_PRESETS}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{value && (
				<div
					className="search-input-clear-button m-0"
					aria-label="Clear search"
					onClick={() => setValue("")}
				/>
			)}
		</div>
	);
};
