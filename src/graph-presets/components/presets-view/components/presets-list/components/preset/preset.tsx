import { ThreeDotsMenu } from "./components/three-dots-menu/three-dots-menu";
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { SavePreset } from "./components/save-preset";
import { PresetLabel } from "./components/preset-label";
import { useRef, useState } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

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
					placeholder="Preset name"
					defaultValue={meta.name}
					ref={inputRef}
					autoFocus={true}
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

				<ThreeDotsMenu
					meta={meta}
					toggleRenamePreset={toggleRenamePreset}
				/>
			</>
		);
	}

	return (
		<>
			<div className="setting-item">
				<div className="setting-item-info">
					{!renaming && meta.name !== "" && (
						<PresetLabel meta={meta} />
					)}
				</div>
				<div className="setting-item-control">{controls}</div>
			</div>
		</>
	);
};
