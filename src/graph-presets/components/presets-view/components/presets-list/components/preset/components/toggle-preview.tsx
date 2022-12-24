import { svgs } from "src/assets/svgs";

type Props = {
	togglePreview: () => void;
	showPreview: boolean;
};

export const TogglePreview: React.FC<Props> = ({ showPreview, togglePreview }) => {
	return (
		<button className="mod-cta" onClick={togglePreview} aria-label="Toggle preview">
			{showPreview ? svgs["chevron-up"] : svgs["chevron-down"]}
		</button>
	);
};
