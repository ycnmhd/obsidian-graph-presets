export const defaultWidth = 18;

export type SVGProps = {
	width?: number;
	className?: string;
	onClick?: React.EventHandler<any>;
	fill?: string;
	color?: string;
	"data-non-draggable"?: boolean;
	"aria-label"?: string;
};
