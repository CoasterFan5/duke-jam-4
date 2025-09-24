import type { GameBuildingName } from '../gameBuildings/gameBuildings';
import { TileManager } from './tileManager';

export const PLACE_HANDLERS: Record<GameBuildingName, () => TileManager> = {
	producer: () => {
		return new TileManager({
			building: 'producer',
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
	},
	inserter: () => {
		return new TileManager({
			building: 'inserter',
			facing: 'e'
		});
	}
} as const;
