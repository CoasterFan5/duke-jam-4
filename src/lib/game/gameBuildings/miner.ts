import type { GameBuildingBehavior } from './gameBuildings';
import { getNextTile } from './utils/getDirectionTile';
import renderer from '$lib/assets/Miner.png';

export const miner: GameBuildingBehavior = {
	tickAction: ({ thisTile, x, y, mapManager }) => {
		const nt = getNextTile(x, y, thisTile.data.facing, mapManager);
		if (nt && !nt.data.holding) {
			nt.setHolding('ironOre');
			thisTile.data.cooldown = 1_000;
		}
	},
	defaultCooldown: 1_000,
	renderer
};
