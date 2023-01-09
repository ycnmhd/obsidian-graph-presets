import { useAppSelector } from "src/store/hooks";
import { AddPreset } from "./components/add-preset";
import { SortPresets } from "./components/sort-presets";
export const navBarHeight = 40;
type Props = {
	createPreset: () => void;
};

export const NavHeader: React.FC<Props> = ({ createPreset }) => {
	const sortBy = useAppSelector((state) => state.preferences.sortBy);
	return (
		<div className="nav-header" style={{ height: navBarHeight }}>
			<div className="nav-buttons-container">
				<AddPreset createPreset={createPreset} />
				<SortPresets sortBy={sortBy} />
			</div>
		</div>
	);
};
