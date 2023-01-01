import { useCallback, useEffect, useRef } from "react";

type Props = {
	value: string;
	placeholder?: string;
	children?: React.ReactNode;
};

export const TextInput: React.FC<Props> = ({
	value,
	placeholder = "Search",
	children,
}) => {
	const ref = useRef<HTMLTextAreaElement>(null);
	const autoSize = useCallback(() => {
		// from https://codepen.io/vsync/pen/nrKwbm
		const el = ref.current as HTMLTextAreaElement;
		setTimeout(function () {
			el.style.height = "auto";
			el.style.height = el.scrollHeight + "px";
		}, 0);
	}, []);
	useEffect(() => {
		autoSize();
		
	}, [value, autoSize]);
	useEffect(()=>{
		app.workspace.on("resize", autoSize);
	},[])

	return (
		<div className="setting-item mod-search-setting relative">
			<div className="setting-item-info">
				<div className="setting-item-name"></div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<div className=" flex items-center relative flex-grow m-0 min-w-120px">
					<textarea
						onKeyDown={autoSize}
						ref={ref}
						style={{
							resize: "none",
							overflow: "hidden",
							padding: "10px 25px",
							width: "100%",
						}}
						spellCheck="false"
						placeholder={placeholder}
						defaultValue={value}
						cols={1}
						rows={1}
						disabled={true}
					/>
				</div>
			</div>
			{children}

			<svg
				className="absolute left-[7px] opacity-50 "
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
					fill="#A0AEC0"
				/>
			</svg>
		</div>
	);
};
