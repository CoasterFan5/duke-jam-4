import type { GameBuildingBehavior } from './gameBuildings';
import { getNextTile } from './utils/getDirectionTile';
import renderer from '$lib/assets/Miner.png';

const defaultCooldown = 5_000;

export const miner: GameBuildingBehavior = {
	tickAction: ({ thisTile, x, y, mapManager }) => {
		const nt = getNextTile(x, y, thisTile.data.facing, mapManager);
		if (nt && !nt.data.holding) {
			nt.setHolding('ironOre');
			thisTile.data.cooldown = defaultCooldown;
		}
	},
	isValidPlacementLocation: ({ tile }) => {
		return !tile.data.building;
	},
	defaultCooldown: defaultCooldown,
	renderer
};
