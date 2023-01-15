import { useCallback, useEffect, useRef } from "react";

export const useAutoSize = (value: string) => {
	const inputRef = useRef<HTMLTextAreaElement>();
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const autoSize = useCallback(
		(delay = 10) => {
			// from https://codepen.io/vsync/pen/nrKwbm
			timeoutRef.current = setTimeout(function () {
				const el = inputRef.current as HTMLTextAreaElement;
				if (el) {
					el.style.height = "auto";
					el.style.height = el.scrollHeight + "px";
				}
			}, delay);
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		},
		[inputRef.current]
	);

	useEffect(() => {
		autoSize();
	}, [value, autoSize]);
	useEffect(() => {
		autoSize(1000);
	}, []);
	useEffect(() => {
		app.workspace.on("resize", autoSize);
	}, []);
	return { inputRef, autoSize };
};
