import { useEffect, useRef, useState } from "react";
import { ac } from "src/store/store";
import { t } from "src/lang/text";
import { useAppSelector } from "src/store/hooks";

export const searchInputHeight = 38;

export const SearchInput: React.FC = () => {
	const currentValue = useAppSelector((state) => state.preferences.filter);
	const [value, setValue] = useState(currentValue);

	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	useEffect(() => {
		if (value !== currentValue) {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				ac.setFilter(value);
			}, 200);
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
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
