import * as React from "react";
import { t } from "src/lang/text";
import { Check } from "src/assets/svg/lucid/check";
import { ac } from "src/store/store";
import { ArrowDown } from "src/assets/svg/lucid/arrow-down";
import { graphSettingsGroup } from "src/types/apply-preset";

type Props = {
	group: graphSettingsGroup;
	created: number;
};
export const GroupHeaderButtons = ({ created, group }: Props) => {
	return (
		<div
			className="opacity-0 group-hover:opacity-100"
			style={{
				display: "flex",
				alignItems: "center",
				gap: 5,
			}}
		>
			<div
				className="tree-item-icon cursor-pointer"
				style={{ paddingInlineEnd: 0 }}
				aria-label={t.c.APPLY_GROUP}
			>
				<Check
					width={16}
					onClick={() => {
						ac.applyPreset({ created, group });
					}}
				/>
			</div>
			<div
				className="tree-item-icon cursor-pointer"
				style={{ paddingInlineEnd: 0 }}
				aria-label={t.c.UPDATE_GROUP}
			>
				<ArrowDown
					width={16}
					onClick={() => {
						ac.updatePreset({ created, group });
					}}
				/>
			</div>
		</div>
	);
};
