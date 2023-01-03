/* eslint-disable no-mixed-spaces-and-tabs */
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { SavePreset } from "./components/save-preset";
import { PresetLabel } from "./components/preset-label";
import React, { useRef, useState } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";
import { presetContextMenu } from "./callbacks/preset-context-menu";



type Props = {
	meta: MarkdownPresetMeta;

	deleteUnsavedPreset?: () => void;
};

export const Preset: React.FC<Props> = ({
	meta,

	deleteUnsavedPreset,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [renaming, setRenaming] = useState(false);

	const cancelRenaming = () => {
		setRenaming(false);
		if (deleteUnsavedPreset) deleteUnsavedPreset();
	};
	const toggleRenamePreset = () => {
		setRenaming((renaming) => !renaming);
	};

	let controls;
	if (renaming || meta.name === "") {
		controls = (
			<>
				<input
					type="text"
					placeholder={t.c.PRESET_NAME}
					defaultValue={meta.name}
					ref={inputRef}
					autoFocus={true}
					className="max-w-[55%]"
				/>
				<SavePreset
					getInputValue={() => inputRef.current?.value || ""}
					meta={meta}
					deleteUnsavedPreset={deleteUnsavedPreset}
					cancelRenaming={cancelRenaming}
				/>
				<CancelRenaming cancelRenaming={cancelRenaming} />
			</>
		);
	} else {
		controls = (
			<>
				<ApplyPreset meta={meta} />

				
			</>
		);
	}

	return (
		<>
			<div
				className="setting-item group"
				onContextMenu={
					deleteUnsavedPreset
						? undefined
						: presetContextMenu(meta, toggleRenamePreset)
				}
			>
				<div className="setting-item-info">
					{!renaming && meta.name !== "" && (
						<PresetLabel meta={meta} />
					)}
				</div>
				<div className="setting-item-control max-w-[90%]">
					{controls}
				</div>
			</div>
		</>
	);
};
