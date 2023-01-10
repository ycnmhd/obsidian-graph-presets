/* eslint-disable no-mixed-spaces-and-tabs */
import { PresetLabel } from "./components/preset-label";
import React, { useState } from "react";
import { MarkdownPresetMeta } from "src/graph-presets";
import { presetContextMenu } from "./callbacks/preset-context-menu";
import { Input } from "./components/input";
import { filesByCtime } from "../../../../../../../../store/cache/files-by-time";

type Props = {
	meta: MarkdownPresetMeta;

	deleteUnsavedPreset?: () => void;
};

export const Preset: React.FC<Props> = ({
	meta,

	deleteUnsavedPreset,
}) => {
	const [renaming, setRenaming] = useState(false);

	const cancelRenaming = () => {
		setRenaming(false);
		if (deleteUnsavedPreset) deleteUnsavedPreset();
	};
	const toggleRenamePreset = () => {
		setRenaming((renaming) => !renaming);
	};

	return (
		<>
			<div
				className={
					"group nav-file flex items-center justify-between w-full"
				}
				onContextMenu={
					deleteUnsavedPreset
						? undefined
						: presetContextMenu(meta, toggleRenamePreset)
				}
			>
				{!renaming && filesByCtime.current[meta.created] ? (
					<PresetLabel meta={meta} />
				) : (
					<Input
						meta={meta}
						cancelRenaming={cancelRenaming}
						deleteUnsavedPreset={deleteUnsavedPreset}
					/>
				)}
			</div>
		</>
	);
};
