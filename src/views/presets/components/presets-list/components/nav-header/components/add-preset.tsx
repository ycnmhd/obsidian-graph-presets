import { t } from "src/lang/text";
import { Edit } from "src/assets/svg/lucid/edit";

type Props = {
	createPreset: () => void;
};

export const AddPreset: React.FC<Props> = ({ createPreset }) => {
	return (
		<div
			className="clickable-icon nav-action-button"
			aria-label={t.c.NEW_PRESET}
			onClick={createPreset}
		>
			<Edit width={15} />
		</div>
	);
};
