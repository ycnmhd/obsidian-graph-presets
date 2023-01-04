import { useEffect, useRef } from "react";

export type InputStateProps = {
	value: string | number | boolean;
	onChangeDebounced: (value: string | boolean) => void;

	delay?: number;
};
export const useInputState = <
	T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(
	props: InputStateProps
) => {
	const inputRef = useRef<T>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (inputRef.current) inputRef.current.value = String(props.value);
	}, [props.value]);
	useEffect(() => {
		const { onChangeDebounced, delay = 100 } = props;
		if (inputRef.current) {
			const callback = (event: Event) => {
				const element = event.target as T;

				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					if (element.type === "checkbox")
						onChangeDebounced(
							(element as HTMLInputElement).checked
						);
					else onChangeDebounced(element.value);
				}, delay);
			};
			inputRef.current.addEventListener("change", callback);
			return () => {
				if (inputRef.current)
					inputRef.current.removeEventListener("change", callback);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}
	}, [props.onChangeDebounced, props.value]);

	return {
		inputRef,
	};
};
