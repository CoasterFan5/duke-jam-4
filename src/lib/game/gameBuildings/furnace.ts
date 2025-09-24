import type { GameBuildingBehavior } from './gameBuildings';
import { getNextTile } from './utils/getDirectionTile';
import type { GameItem } from '../mapManager/mapManager';

const DEFAULT_COOLDOWN = 2_000;

const productMap: Partial<Record<GameItem, GameItem>> = {
	ironOre: 'ironPlate'
} as const;

export const furnace: GameBuildingBehavior = {
	tickAction: ({ thisTile, mapManager, x, y }) => {
		const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
		if (
			nextTile &&
			!nextTile.data.holding &&
			thisTile.data.holding &&
			productMap[thisTile.data.holding]
		) {
			const product = productMap[thisTile.data.holding];
			if (product) {
				nextTile.setHolding(product);
				thisTile.clearHolding();
			}
		}
	},
	placeAction: ({ thisTile }) => {
		thisTile.data.cooldown = DEFAULT_COOLDOWN;
	},
	defaultCooldown: DEFAULT_COOLDOWN
};
