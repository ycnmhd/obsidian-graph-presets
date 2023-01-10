import { useRef } from "react";
import { ac } from "src/store/store";
import { MarkdownPresetMeta } from "src/graph-presets";
import { t } from "src/lang/text";
import { filesByCtime } from "../../../../../../../../../store/cache/files-by-time";

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
	const preset = filesByCtime.current[meta.created] || {};
	const save = () => {
		const value = inputRef.current?.value;
		if (!value) return;
		if (preset.basename === value) {
			cancelRenaming();
		} else {
			if (preset.basename)
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
			defaultValue={preset.basename}
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
