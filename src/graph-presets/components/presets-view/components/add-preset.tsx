type Props = {
	createPreset: () => void;
};

export const AddPreset: React.FC<Props> = ({ createPreset }) => {
	return (
		<div className="setting-item">
			<div className="setting-item-controls">
				<button className="mod-cta" onClick={createPreset}>
					Create a new preset
				</button>
			</div>
		</div>
	);
};
