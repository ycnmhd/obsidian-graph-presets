import { svgs } from "src/assets/svgs";
import { t } from "src/graph-presets/lang/text";

type Props = {
	createPreset: () => void;
};

export const AddPreset: React.FC<Props> = ({ createPreset }) => {
	return (
		<div
			className="clickable-icon nav-action-button"
			aria-label={t.c.NEW_PRESET}
			onClick={createPreset}
		>
			{svgs["document-plus"]}
		</div>
	);
};
