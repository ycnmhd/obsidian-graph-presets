import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	meta: MarkdownPresetMeta;
};

export const ApplyPreset: React.FC<Props> = ({ meta }) => {
	return (
		<button
			className=""
			onClick={() => {
				actions.applyPreset(meta);
			}}
			aria-label={t.c.APPLY_PRESET}
		>
			{svgs["document-check"]}
		</button>
	);
};
