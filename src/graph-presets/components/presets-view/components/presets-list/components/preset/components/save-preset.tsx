import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";

type Props = {
	presetName: string;
	getInputValue: () => string;
	deleteUnsavedPreset?: () => void;
};

export const SavePreset: React.FC<Props> = ({
	presetName,
	getInputValue,
	deleteUnsavedPreset,
}) => {
	return (
		<button
			className="mod-cta"
			onClick={() => {
				const value = getInputValue();
				if (!value) return;
				if (presetName) actions.renamePreset(presetName, value);
				else actions.createPreset(value);
				if (deleteUnsavedPreset) deleteUnsavedPreset();
			}}
			aria-label="Save preset"
		>
			{svgs["check-circle"]}
		</button>
	);
};
