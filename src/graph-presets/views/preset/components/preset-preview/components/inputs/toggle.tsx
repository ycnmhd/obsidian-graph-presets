import { useInputState } from "./hooks/input-state";

type Props = {
	enabled: boolean;
	name: string;
	onChange: (value: boolean) => void;
};

export const Toggle: React.FC<Props> = ({ enabled, name, onChange }) => {
	const { inputRef } = useInputState({
		onChangeDebounced: (value) => onChange(value as boolean),
		value: enabled,
		delay: 0,
	});

	return (
		<div className="setting-item mod-toggle border-none">
			<div className="setting-item-info">
				<div className="setting-item-name">{name}</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<div
					className={`checkbox-container mod-small ${
						enabled ? "is-enabled" : ""
					}`}
				>
					<input
						type="checkbox"
						style={{ width: "100%" }}
						tabIndex={0}
						ref={inputRef}
						defaultChecked={enabled}
					/>
				</div>
			</div>
		</div>
	);
};
