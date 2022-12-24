import { AddPreset } from "./components/add-preset";
export const navBarHeight = 40;
type Props = {
	createPreset: () => void;
    
};

export const NavHeader: React.FC<Props> = ({ createPreset }) => {
	return (
		<div className="nav-header" style={{ height: navBarHeight }}>
			<div className="nav-buttons-container">
				<AddPreset createPreset={createPreset} />
			</div>
		</div>
	);
};
