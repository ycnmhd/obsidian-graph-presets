import { SortMode } from "src/graph-presets/settings/default-settings";
import { AddPreset } from "./components/add-preset";
import { SortPresets } from "./components/sort-presets";
export const navBarHeight = 40;
type Props = {
	createPreset: () => void;
	sortBy: SortMode;
};

export const NavHeader: React.FC<Props> = ({ createPreset, sortBy }) => {
	return (
		<div className="nav-header" style={{ height: navBarHeight }}>
			<div className="nav-buttons-container">
				<AddPreset createPreset={createPreset} />
				<SortPresets sortBy={sortBy} />
			</div>
		</div>
	);
};
