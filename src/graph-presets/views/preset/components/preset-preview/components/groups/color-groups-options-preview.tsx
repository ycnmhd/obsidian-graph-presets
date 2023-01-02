/* eslint-disable no-mixed-spaces-and-tabs */
import { GroupContainer } from "../group-container/group-container";
import { ColorGroupOptions } from "src/types/graph-settings";
import { ColorOption } from "../inputs/color-option";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { useColorGroups } from "./hooks/color-groups";
import { actions } from "src/graph-presets/actions/actions";
import { hexToRgb } from "../../helpers/map-colors";

type Props = {
	options: ColorGroupOptions;
	meta: MarkdownPresetMeta;
};

export const ColorGroupsOptionsPreview: React.FC<Props> = ({
	options,
	meta,
}) => {
	const { state, updateColor, updateQuery, addGroup, removeGroup } =
		useColorGroups(options.colorGroups, (groups) => {
			actions.saveAttribute(meta, {
				name: "colorGroups",
				value: groups,
			});
		});
	return (
		<GroupContainer meta={meta} group="groups">
			{state.groups.map((color, i) => (
				<ColorOption
					color={color}
					key={color.color.rgb + color.query}
					onColorChange={(value) => {
						updateColor(i, hexToRgb(value));
					}}
					onQueryChange={(query) => {
						updateQuery(i, query);
					}}
					removeGroup={() => removeGroup(i)}
				/>
			))}
			<div className="graph-color-button-container">
				<button className="mod-cta" onClick={addGroup}>
					New group
				</button>
			</div>
		</GroupContainer>
	);
};
