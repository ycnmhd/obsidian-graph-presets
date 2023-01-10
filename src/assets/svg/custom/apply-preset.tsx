import { SVGProps } from "../helpers/default-props";
import { addIcon } from "obsidian";

export const ApplyPreset: React.FC<SVGProps> = ({ ...props }) => {
	return (
		<svg
			viewBox="0 0 26 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M5.8 22.6C5.8 23.2365 6.05286 23.847 6.50294 24.2971C6.95303 24.7471 7.56348 25 8.2 25H22.6C23.2365 25 23.847 24.7471 24.2971 24.2971C24.7471 23.847 25 23.2365 25 22.6V7.6L18.4 1H8.2C7.56348 1 6.95303 1.25286 6.50294 1.70294C6.05286 2.15303 5.8 2.76348 5.8 3.4V7.6M17.8 1V8.2H25M1 14.952L3.24 17.192L7.72 12.712M14.1559 17.2891C14.7839 18.3726 14.4148 19.76 13.3313 20.388C12.2479 21.0161 10.8605 20.6469 10.2324 19.5635C9.6044 18.48 9.97356 17.0926 11.057 16.4646C12.1404 15.8365 13.5278 16.2057 14.1559 17.2891ZM20.5709 13.5704C21.199 14.6539 20.8298 16.0413 19.7464 16.6693C18.663 17.2974 17.2756 16.9282 16.6475 15.8448C16.0195 14.7614 16.3886 13.3739 17.4721 12.7459C18.5555 12.1179 19.9429 12.487 20.5709 13.5704Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

addIcon(
	"apply-preset",
	`<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.8 22.6C5.8 23.2365 6.05286 23.847 6.50294 24.2971C6.95303 24.7471 7.56348 25 8.2 25H22.6C23.2365 25 23.847 24.7471 24.2971 24.2971C24.7471 23.847 25 23.2365 25 22.6V7.6L18.4 1H8.2C7.56348 1 6.95303 1.25286 6.50294 1.70294C6.05286 2.15303 5.8 2.76348 5.8 3.4V7.6M17.8 1V8.2H25M1 14.952L3.24 17.192L7.72 12.712M14.1559 17.2891C14.7839 18.3726 14.4148 19.76 13.3313 20.388C12.2479 21.0161 10.8605 20.6469 10.2324 19.5635C9.6044 18.48 9.97356 17.0926 11.057 16.4646C12.1404 15.8365 13.5278 16.2057 14.1559 17.2891ZM20.5709 13.5704C21.199 14.6539 20.8298 16.0413 19.7464 16.6693C18.663 17.2974 17.2756 16.9282 16.6475 15.8448C16.0195 14.7614 16.3886 13.3739 17.4721 12.7459C18.5555 12.1179 19.9429 12.487 20.5709 13.5704Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
);