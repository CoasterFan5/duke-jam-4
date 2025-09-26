import type { GameItem, GameMapManager } from '$lib/game/mapManager/mapManager';
import type { TileManager } from '$lib/game/mapManager/tileManager';
import type { UiManager } from '$lib/game/uiManager/uiManager';
import type { UiRenderType } from '$lib/game/uiManager/uiRenderType';

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

export type OnClickParams = {
	mapManager: GameMapManager;
	tileManager: TileManager;
};

export type GetUiParams = {
	uiManager: UiManager;
};

export abstract class GameBuilding {
	private COOLDOWN_TIME = 5_000;

	constructor() {}

	abstract tick(params: TickMethodParams): void;
	abstract placeAction(params: PlaceActionParams): void;
	abstract getRenderer(): HTMLImageElement;
	abstract new(): GameBuilding;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isValidPlacement(params: IsValidPlacementParams): boolean {
		return true;
	}

	canAcceptItem(params: CanAcceptItemParams) {
		return !params.tile.data.holding;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	postPlaceAction(params: PlaceActionParams) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getUi(params: GetUiParams): UiRenderType {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onClick(params: OnClickParams): void {
		return;
	}
}
