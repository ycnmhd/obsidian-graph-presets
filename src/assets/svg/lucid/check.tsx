import { SVGProps } from "../helpers/default-props";

export const Check: React.FC<SVGProps> = ({ ...props }) => {
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
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
	);
};
