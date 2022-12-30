import { ThreeDotsMenu } from "./components/three-dots-menu/three-dots-menu";
import { ApplyPreset } from "./components/apply-preset";
import { CancelRenaming } from "./components/cancel-renaming";
import { SavePreset } from "./components/save-preset";
import { TogglePreview } from "./components/toggle-preview";
import { PresetLabel } from "./components/preset-label";
import { PresetPreview } from "./components/preset-preview/preset-preview";
import { useEffect, useRef, useState } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { actions } from "src/graph-presets/actions/actions";
import { GraphSettings } from "src/types/graph-settings";
import { logger } from "src/graph-presets/helpers/logger";

type Props = {
	meta: MarkdownPresetMeta;
	showPreviewProp?: boolean;
	deleteUnsavedPreset?: () => void;
};

export const Preset: React.FC<Props> = ({
	meta,
	showPreviewProp = false,
	deleteUnsavedPreset,
}) => {
	const [showPreview, setShowPreview] = useState(showPreviewProp);
	const inputRef = useRef<HTMLInputElement>(null);
	const [renaming, setRenaming] = useState(false);

	const [preset, setPreset] = useState<{
		data?: GraphSettings;
		error?: Error;
	}>({});
	useEffect(() => {
		if (showPreview) {
			const load = async () => {
				try {
					const preset = await actions.getPreset(meta);
					// TODO: merge with current settings to fill in missing values (e.g. if markdown preset is partial)
					setPreset({
						data: preset as GraphSettings,
						error: undefined,
					});
				} catch (e) {
					logger.error(e);
					setPreset({
						data: undefined,
						error: e,
					});
				}
			};
			load();
		}
	}, [meta.updated, showPreview]);
	if (!preset) return null;

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
				<TogglePreview
					togglePreview={togglePreview}
					showPreview={showPreview}
				/>
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
			{showPreview && <PresetPreview meta={meta} preset={preset} />}
		</>
	);
};
