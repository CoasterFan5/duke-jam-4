import { Conveyer } from './conveyer';
import { Furnace } from './furnace';
import { Miner } from './miner';
import type { GameBuilding } from './utils/BehaviorBase';

export const gameBuildings = ['Conveyer', 'Miner', 'Furnace'] as const;

export type GameBuildingName = (typeof gameBuildings)[number];

export const gameBuildingBehavior: Record<GameBuildingName, new () => GameBuilding> = {
	Conveyer: Conveyer,
	Furnace: Furnace,
	Miner: Miner
};
