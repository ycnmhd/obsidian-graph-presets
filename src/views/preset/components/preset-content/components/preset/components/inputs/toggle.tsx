import { GraphSettings } from "src/types/graph-settings";
import { graphInputLabels } from "src/lang/graph-input-labels";
import { useAppSelector } from "src/store/hooks";
import { ac } from "src/store/store";

type Props = {
	name: keyof GraphSettings;
	created: number;
};

export const Toggle: React.FC<Props> = ({ name, created }) => {
	const enabled = useAppSelector(
		(state) => state.preset.presets[created][name]
	) as boolean;

	return (
		<div className="setting-item mod-toggle border-none relative">
			<div className="setting-item-info">
				<div className="setting-item-name">
					{graphInputLabels[name]}
				</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<div
					className={`checkbox-container mod-small ${
						enabled ? "is-enabled" : ""
					}`}
					onClick={() => {
						ac.updateAttribute({ name, value: !enabled, created });
					}}
				>
					<input type="checkbox" tabIndex={0} />
				</div>
			</div>
		</div>
	);
};
