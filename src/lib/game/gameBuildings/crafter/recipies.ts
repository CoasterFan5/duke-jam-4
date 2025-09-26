import type { GameItem } from '$lib/game/mapManager/mapManager';

export const craftingRecipieNames = ['ironGear', 'ironRod'] as const;
export type RecipieName = (typeof craftingRecipieNames)[number];

export const craftingRecipies: Record<
	RecipieName,
	{
		requirements: GameItem[];
		product: GameItem;
	}
> = {
	ironGear: {
		requirements: ['ironPlate', 'ironPlate'],
		product: 'ironGear'
	},
	ironRod: {
		requirements: ['ironPlate'],
		product: 'ironRod'
	}
} as const;
