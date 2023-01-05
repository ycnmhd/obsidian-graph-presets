import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	meta: MarkdownPresetMeta;
};

export const ApplyPreset: React.FC<Props> = ({ meta }) => {
	return (
		<>
			{svgs["document-check"]({
				"aria-label": t.c.APPLY_PRESET,
				width: 16,
				className: "opacity-0 group-hover:opacity-100",
				onClick: (e) => {
					e.stopPropagation();
					actions.applyPreset(meta);
				},
			})}
		</>
	);
};
