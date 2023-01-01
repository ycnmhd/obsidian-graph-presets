type Props = {
	enabled: boolean;
	name: string;
};

export const Toggle: React.FC<Props> = ({ enabled, name }) => {
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
					<input type="checkbox" tabIndex={0} disabled={true} />
				</div>
			</div>
		</div>
	);
};
