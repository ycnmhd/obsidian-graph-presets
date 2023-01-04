import { TextInputBody, TextInputProps } from "./text-input-body";

export const TextInput: React.FC<TextInputProps> = (props) => {
	return (
		<div className="setting-item mod-search-setting relative group">
			<TextInputBody {...props} />
		</div>
	);
};
