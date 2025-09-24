import type { GameMapManager } from '$lib/game/mapManager/mapManager';
import type { FacingDirection } from '$lib/game/mapManager/tileManager';

export const getPrevTile = (
	x: number,
	y: number,
	facing: FacingDirection,
	gameMapManager: GameMapManager
) => {
	switch (facing) {
		case 'n': {
			return gameMapManager.getTile(x, y + 1);
		}
		case 's': {
			return gameMapManager.getTile(x, y - 1);
		}
		case 'e': {
			return gameMapManager.getTile(x - 1, y);
		}
		case 'w': {
			return gameMapManager.getTile(x + 1, y - 1);
		}
	}
};

export const getNextTile = (
	x: number,
	y: number,
	facing: FacingDirection,
	gameMapManager: GameMapManager
) => {
	switch (facing) {
		case 'n': {
			return gameMapManager.getTile(x, y - 1);
		}
		case 's': {
			return gameMapManager.getTile(x, y + 1);
		}
		case 'e': {
			return gameMapManager.getTile(x + 1, y);
		}
		case 'w': {
			return gameMapManager.getTile(x - 1, y - 1);
		}
	}
};
