import type { GameItem, GameMapManager } from '$lib/game/mapManager/mapManager';
import type { TileManager } from '$lib/game/mapManager/tileManager';

export type TickMethodParams = {
	thisTile: TileManager;
	mapManager: GameMapManager;
	x: number;
	y: number;
	tickId: number;
	delta: number;
};

export type PlaceActionParams = { thisTile: TileManager };

export type IsValidPlacementParams = {
	tile: TileManager;
	gameManager: GameMapManager;
};

export type CanAcceptItemParams = {
	tile: TileManager;
	itemName: GameItem;
};

export abstract class GameBuilding {
	private COOLDOWN_TIME = 5_000;

	constructor() {}

	abstract tick(params: TickMethodParams): void;
	abstract placeAction(params: PlaceActionParams): void;
	abstract isValidPlacement(params: IsValidPlacementParams): boolean;
	abstract getRenderer(): HTMLImageElement;
	abstract new(): GameBuilding;

	canAcceptItem(params: CanAcceptItemParams) {
		return !params.tile.data.holding;
	}
}
