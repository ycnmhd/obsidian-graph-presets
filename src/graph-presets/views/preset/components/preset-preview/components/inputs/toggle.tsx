import { useEffect, useState } from "react";

type Props = {
	enabled: boolean;
	name: string;
	onChange: (value: boolean) => void;
};

export const Toggle: React.FC<Props> = ({ enabled, name, onChange }) => {
	const [localEnabled, setLocalEnabled] = useState(enabled);
	useEffect(() => {
		if (localEnabled !== enabled) {
			setLocalEnabled(enabled);
		}
	}, [enabled]);

	return (
		<div className="setting-item mod-toggle border-none">
			<div className="setting-item-info">
				<div className="setting-item-name">{name}</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<div
					className={`checkbox-container mod-small ${
						localEnabled ? "is-enabled" : ""
					}`}
					onClick={() => {
						setLocalEnabled((prev) => !prev);
						onChange(!enabled);
					}}
				>
					<input type="checkbox" tabIndex={0} />
				</div>
			</div>
		</div>
	);
};
