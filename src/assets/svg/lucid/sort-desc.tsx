import { SVGProps } from "../helpers/default-props";

export const SortDesc: React.FC<SVGProps> = ({ ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M11 5h10"></path>
			<path d="M11 9h7"></path>
			<path d="M11 13h4"></path>
			<path d="m3 17 3 3 3-3"></path>
			<path d="M6 18V4"></path>
		</svg>
	);
};
