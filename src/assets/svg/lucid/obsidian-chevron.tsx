import { SVGProps } from "../helpers/default-props";

export const ChevronDown: React.FC<SVGProps> = ({ ...props }) => {
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
			className="svg-icon right-triangle"
			{...props}
		>
			<path d="M3 8L12 17L21 8"></path>
		</svg>
	);
};
