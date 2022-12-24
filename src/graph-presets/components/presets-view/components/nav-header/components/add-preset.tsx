import { svgs } from "src/assets/svgs";

type Props = {
	createPreset: () => void;
};

export const AddPreset: React.FC<Props> = ({ createPreset }) => {
	return (
		<div
			className="clickable-icon nav-action-button"
			aria-label="New preset"
			onClick={createPreset}
		>
			{svgs["document-plus"]}
			
		</div>
	);
};
