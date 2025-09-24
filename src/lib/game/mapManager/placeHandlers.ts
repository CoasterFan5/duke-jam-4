import type { GameBuildingName } from '../gameBuildings/gameBuildings';
import { TileManager } from './tileManager';

export const PLACE_HANDLERS: Record<GameBuildingName, () => TileManager> = {
	miner: () => {
		return new TileManager({
			building: 'miner',
			facing: 'e'
		});
	},
	furnace: () => {
		return new TileManager({
			building: 'furnace',
			facing: 'e'
		});
	},
	conveyer: () => {
		return new TileManager({
			building: 'conveyer',
			facing: 'e'
		});
	}
} as const;
