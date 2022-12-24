import { svgs } from "src/assets/svgs";

type Props = {
	cancelRenaming: () => void;
};

export const CancelRenaming: React.FC<Props> = ({ cancelRenaming }) => {
	return <button onClick={cancelRenaming} aria-label="Cancel">{svgs["x-circle"]}</button>;
};
