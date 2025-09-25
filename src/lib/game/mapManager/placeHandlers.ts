import { Conveyer } from '../gameBuildings/conveyer';
import { Furnace } from '../gameBuildings/furnace';
import type { GameBuildingName } from '../gameBuildings/gameBuildings';
import { Miner } from '../gameBuildings/miner';
import { TileManager } from './tileManager';

export const PLACE_HANDLERS: Record<GameBuildingName, () => TileManager> = {
	Miner: () => {
		return new TileManager({
			building: new Miner(),
			facing: 'e'
		});
	},
	Furnace: () => {
		return new TileManager({
			building: new Furnace(),
			facing: 'e'
		});
	},
	Conveyer: () => {
		return new TileManager({
			building: new Conveyer(),
			facing: 'e'
		});
	}
} as const;
