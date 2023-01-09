import { SVGProps } from "../helpers/default-props";

export const FileEdit: React.FC<SVGProps> = ({ ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M4 13.5V4a2 2 0 012-2h8.5L20 7.5V20a2 2 0 01-2 2h-5.5"></path>
			<path d="M14 2L14 8 20 8"></path>
			<path d="M10.42 12.61a2.1 2.1 0 112.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44z"></path>
		</svg>
	);
};
