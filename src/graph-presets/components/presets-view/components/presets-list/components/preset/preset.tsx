import { ThreeDotsMenu } from "./components/three-dots-menu/three-dots-menu";
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { SavePreset } from "./components/save-preset";
import { TogglePreview } from "./components/toggle-preview";
import { PresetLabel } from "./components/preset-label";
import { PresetPreview } from "./components/preset-preview/preset-preview";
import { useRef, useState } from "react";

type Props = {
	presetName: string;

	showPreviewProp?: boolean;
	deleteUnsavedPreset?: () => void;
};

export const Preset: React.FC<Props> = ({
	presetName,

	showPreviewProp = false,
	deleteUnsavedPreset,
}) => {
	const [showPreview, setShowPreview] = useState(showPreviewProp);
	const inputRef = useRef<HTMLInputElement>(null);
	const [renaming, setRenaming] = useState(false);
	const cancelRenaming = () => {
		setRenaming(false);
		if (deleteUnsavedPreset) deleteUnsavedPreset();
	};
	const toggleRenamePreset = () => {
		setRenaming((renaming) => !renaming);
	};

	const togglePreview = () => {
		setShowPreview((preview) => !preview);
	};

	let controls;
	if (renaming || presetName === "") {
		controls = (
			<>
				<input
					type="text"
					placeholder="Preset name"
					defaultValue={presetName}
					ref={inputRef}
					autoFocus={true}
				/>
				<SavePreset
					getInputValue={() => inputRef.current?.value || ""}
					presetName={presetName}
					deleteUnsavedPreset={deleteUnsavedPreset}
				/>
				<CancelRenaming cancelRenaming={cancelRenaming} />
			</>
		);
	} else {
		controls = (
			<>
				<ApplyPreset presetName={presetName} />
				<TogglePreview
					togglePreview={togglePreview}
					showPreview={showPreview}
				/>
				<ThreeDotsMenu
					presetName={presetName}
					toggleRenamePreset={toggleRenamePreset}
				/>
			</>
		);
	}

	return (
		<>
			<div className="setting-item">
				<div className="setting-item-info">
					{!renaming && presetName !== "" && (
						<PresetLabel presetName={presetName} />
					)}
				</div>
				<div className="setting-item-control">{controls}</div>
			</div>
			{showPreview && <PresetPreview presetName={presetName} />}
		</>
	);
};
