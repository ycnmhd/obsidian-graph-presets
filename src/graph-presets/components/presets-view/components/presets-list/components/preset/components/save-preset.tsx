import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

type Props = {
	meta: MarkdownPresetMeta;
	getInputValue: () => string;
	deleteUnsavedPreset?: () => void;
	cancelRenaming: () => void;
};

export const SavePreset: React.FC<Props> = ({
	meta,
	getInputValue,
	deleteUnsavedPreset,
	cancelRenaming,
}) => {
	return (
		<button
			className="mod-cta"
			onClick={() => {
				const value = getInputValue();
				if (!value) return;
				if (meta.name === value) {
					cancelRenaming();
				} else {
					if (meta.name)
						actions.renamePreset({ created: meta.created }, value);
					else actions.createPreset(value);
					if (deleteUnsavedPreset) deleteUnsavedPreset();
				}
			}}
			aria-label="Save preset"
		>
			{svgs["check-circle"]}
		</button>
	);
};
