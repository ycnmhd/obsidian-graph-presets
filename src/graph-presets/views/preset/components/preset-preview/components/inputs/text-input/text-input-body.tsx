import { useRef, useCallback, useEffect } from "react";
import { useInputState } from "../hooks/input-state";
import { UnsavedChangesIndicator } from "../shared/unsaved-changes-indicator";

export type TextInputProps = {
	value: string;
	placeholder?: string;
	children?: React.ReactNode;
	onChange: (value: string) => void;
	sortable?: boolean;
};

export const TextInputBody: React.FC<TextInputProps> = ({
	value,
	placeholder = "Search",
	children,
	onChange,
	sortable,
}) => {
	const { inputRef, unsavedChanges } = useInputState<HTMLTextAreaElement>({
		onChangeDebounced: onChange,
		value,
	});
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const autoSize = useCallback(() => {
		// from https://codepen.io/vsync/pen/nrKwbm
		timeoutRef.current = setTimeout(function () {
			const el = inputRef.current as HTMLTextAreaElement;
			if (el) {
				el.style.height = "auto";
				el.style.height = el.scrollHeight + "px";
			}
		}, 10);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [inputRef.current]);

	useEffect(() => {
		autoSize();
	}, [value, autoSize]);
	useEffect(() => {
		app.workspace.on("resize", autoSize);
	}, []);
	return (
		<>
			<div className="setting-item-info">
				<div className="setting-item-name"></div>
				<div className="setting-item-description"></div>
			</div>
			<div className={"setting-item-control "}>
				<div className=" flex items-center relative flex-grow m-0 min-w-120px">
					<textarea
						onKeyDown={autoSize}
						ref={inputRef}
						style={{
							resize: "none",
							overflow: "hidden",
							padding: "10px 25px",
							width: "100%",
							minHeight:37
						}}
						spellCheck="false"
						placeholder={placeholder}
						cols={1}
						rows={1}
					/>
				</div>
			</div>
			<UnsavedChangesIndicator show={unsavedChanges} />
			{children}

			<svg
				className="absolute left-[7px] opacity-50 "
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					cursor: sortable ? "grab" : "default",
				}}
			>
				<path
					d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
					fill="#A0AEC0"
				/>
			</svg>
		</>
	);
};
