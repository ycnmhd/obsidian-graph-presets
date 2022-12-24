import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";

type Props = {
	presetName: string;
};


export const ApplyPreset: React.FC<Props> = ({
	presetName,
}) => {
	return (
		<button
			className="mod-cta"
			onClick={() => {
				actions.applyPreset(presetName);
			}}
			aria-label="Apply preset"
		>
			{svgs["document-check"]}
		</button>
	);
};
