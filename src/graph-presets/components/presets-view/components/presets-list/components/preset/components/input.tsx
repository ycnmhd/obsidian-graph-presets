import { useRef } from "react";
import { ac } from "src/graph-presets/store/store";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

type Props = {
	meta: MarkdownPresetMeta;
	deleteUnsavedPreset?: () => void;
	cancelRenaming: () => void;
};

export const Input: React.FC<Props> = ({
	meta,
	cancelRenaming,
	deleteUnsavedPreset,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const save = () => {
		const value = inputRef.current?.value;
		if (!value) return;
		if (meta.name === value) {
			cancelRenaming();
		} else {
			if (meta.name)
				ac.renamePreset({ created: meta.created, newName: value });
			else
				ac.createPreset({
					presetName: value,
				});
			if (deleteUnsavedPreset) deleteUnsavedPreset();
			if (cancelRenaming) cancelRenaming();
		}
	};
	return (
		<input
			type="text"
			placeholder={t.c.PRESET_NAME}
			defaultValue={meta.name}
			ref={inputRef}
			autoFocus={true}
			className="w-[100%] mx-[4px]"
			onKeyDown={(e) => {
				if (e.key === "Enter") save();
				else if (e.key === "Escape") cancelRenaming();
			}}
		/>
	);
};
