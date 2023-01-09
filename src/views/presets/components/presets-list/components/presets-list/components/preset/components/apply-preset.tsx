import { ac } from "src/store/store";
import { MarkdownPresetMeta } from "src/graph-presets";
import { t } from "src/lang/text";
import { Check } from "src/assets/svg/lucid/check";

type Props = {
	meta: MarkdownPresetMeta;
};

export const ApplyPreset: React.FC<Props> = ({ meta }) => {
	return (
		<Check
			aria-label={t.c.APPLY_PRESET}
			width={16}
			className={"opacity-0 group-hover:opacity-100"}
			onClick={(e) => {
				e.stopPropagation();
				ac.applyPreset(meta);
			}}
		/>
	);
};
