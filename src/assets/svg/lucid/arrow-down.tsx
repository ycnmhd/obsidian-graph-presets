import { SVGProps } from "../helpers/default-props";

export const ArrowDown: React.FC<SVGProps> = ({ ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<line x1="12" y1="5" x2="12" y2="19"></line>
			<polyline points="19 12 12 19 5 12"></polyline>
		</svg>
	);
};
