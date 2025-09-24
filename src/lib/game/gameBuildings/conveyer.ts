import type { GameBuildingBehavior } from './gameBuildings';
import { getNextTile } from './utils/getDirectionTile';
import b from '$lib/assets/belt.svg';

const DEFAULT_COOLDOWN = 1_000;

export const conveyer: GameBuildingBehavior = {
	tickAction: ({ thisTile, mapManager, x, y }) => {
		const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
		if (nextTile && !nextTile.data.holding && thisTile.data.holding && nextTile.data.building) {
			nextTile.setHolding(thisTile.data.holding);
			thisTile.clearHolding();
			thisTile.data.cooldown = DEFAULT_COOLDOWN;
		}
	},
	placeAction: ({ thisTile }) => {
		thisTile.data.cooldown = DEFAULT_COOLDOWN;
	},
	defaultCooldown: DEFAULT_COOLDOWN,
	renderer: b
};
