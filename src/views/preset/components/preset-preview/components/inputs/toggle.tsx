import { useEffect, useState } from "react";
import { GraphSettings } from "src/types/graph-settings";
import { graphInputLabels } from "../../../../../../lang/graph-input-labels";
import { UnsavedChangesIndicator } from "./shared/unsaved-changes-indicator";

type Props = {
	enabled: boolean;
	name: keyof GraphSettings;
	onChange: (name: keyof GraphSettings, value: boolean) => void;
};

export const Toggle: React.FC<Props> = ({ enabled, name, onChange }) => {
	const [localEnabled, setLocalEnabled] = useState(enabled);
	useEffect(() => {
		if (localEnabled !== enabled) {
			setLocalEnabled(enabled);
		}
	}, [enabled]);

	return (
		<div className="setting-item mod-toggle border-none relative">
			<div className="setting-item-info">
				<UnsavedChangesIndicator show={localEnabled !== enabled} />
				<div className="setting-item-name">
					{graphInputLabels[name]}
				</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<div
					className={`checkbox-container mod-small ${
						localEnabled ? "is-enabled" : ""
					}`}
					onClick={() => {
						setLocalEnabled((prev) => !prev);
						onChange(name, !enabled);
					}}
				>
					<input type="checkbox" tabIndex={0} />
				</div>
			</div>
		</div>
	);
};
