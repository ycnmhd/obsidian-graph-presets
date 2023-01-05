import { useEffect, useRef, useState } from "react";

type Props = { className?: string; show: boolean; debounce?: number };

export const UnsavedChangesIndicator: React.FC<Props> = ({
	className = "",
	show,
	debounce = 1000,
}) => {
	const [debouncedShow, setDebouncedShow] = useState(show);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (show === debouncedShow) return;
		if (show) {
			timeoutRef.current = setTimeout(() => {
				setDebouncedShow(show);
			}, debounce);
		} else {
			setDebouncedShow(show);
		}
	}, [show]);
	return (
		<>
			{debouncedShow && (
				<div
					aria-label="Unsaved changes"
					className={
						"absolute -right-4 w-2 h-2 rounded-full bg-orange-400 animate-pulse " +
						className
					}
				/>
			)}
		</>
	);
};
