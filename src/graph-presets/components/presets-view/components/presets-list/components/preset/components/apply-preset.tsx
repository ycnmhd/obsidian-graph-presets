import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	meta: MarkdownPresetMeta;
};

export const ApplyPreset: React.FC<Props> = ({ meta }) => {
	return (
		<button
			className="mod-cta"
			onClick={() => {
				actions.applyPreset(meta);
			}}
			aria-label="Apply preset"
		>
			{svgs["document-check"]}
		</button>
	);
};
