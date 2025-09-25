import { Conveyer } from './conveyer';
import { Crafter } from './crafter';
import { Furnace } from './furnace';
import { Miner } from './miner';
import { Splitter } from './splitter';
import type { GameBuilding } from './utils/BehaviorBase';

export const gameBuildings = ['Conveyer', 'Miner', 'Furnace', 'Splitter', 'Crafter'] as const;

export type GameBuildingName = (typeof gameBuildings)[number];

export const gameBuildingBehavior: Record<GameBuildingName, new () => GameBuilding> = {
	Conveyer: Conveyer,
	Furnace: Furnace,
	Miner: Miner,
	Splitter: Splitter,
	Crafter: Crafter
};
