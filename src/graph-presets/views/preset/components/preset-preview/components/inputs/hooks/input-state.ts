import { useEffect, useRef, useState } from "react";

const invokeOnChange = (onChange: any) => (event: Event) => {
	const element = event.target as HTMLInputElement;
	if (element.type === "checkbox") onChange(element.checked);
	else {
		onChange(element.value);
	}
};

export type InputStateProps = {
	value: string | number | boolean;
	onChangeDebounced: (value: string | boolean) => void;
	delaySeconds?: number;
};
export const useInputState = <
	T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>({
	onChangeDebounced,
	value,
	delaySeconds = 1.5,
}: InputStateProps) => {
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const inputRef = useRef<T>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = String(value);
		}
		setUnsavedChanges(false);
	}, [value]);

	useEffect(() => {
		if (inputRef.current) {
			const onChange = invokeOnChange(onChangeDebounced);
			const onInput = (event: Event) => {
				setUnsavedChanges(true);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					onChange(event);
				}, delaySeconds * 1000);
			};
			inputRef.current.addEventListener("input", onInput);
			inputRef.current.addEventListener("change", onChange);

			return () => {
				if (inputRef.current) {
					inputRef.current.removeEventListener("change", onChange);
					inputRef.current.removeEventListener("input", onInput);
				}
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}
	}, [onChangeDebounced, value]);

	return {
		inputRef,
		unsavedChanges,
	};
};
