import type { GameMapManager } from '../mapManager/mapManager';
import type { TileManager } from '../mapManager/tileManager';
import { conveyer } from './conveyer';
import { furnace } from './furnace';
import { miner } from './miner';

export const gameBuildings = ['conveyer', 'miner', 'furnace'] as const;

export type GameBuildingName = (typeof gameBuildings)[number];

/*
tickAction should set the cooldown back to the default
*/

export type GameBuildingBehavior = {
	tickAction: (params: {
		thisTile: TileManager;
		mapManager: GameMapManager;
		x: number;
		y: number;
		tickId: number;
	}) => void;
	placeAction?: (params: { thisTile: TileManager }) => void;
	isValidPlacementLocation: (args: { tile: TileManager; gameManager: GameMapManager }) => boolean;
	defaultCooldown: number;
	renderer: string;
};

export const gameBuildingBehavior: Record<GameBuildingName, GameBuildingBehavior> = {
	conveyer: conveyer,
	furnace,
	miner
};
