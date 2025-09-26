import { type GameBuildingName } from '../gameBuildings/gameBuildings';
import type { GameBuilding } from '../gameBuildings/utils/BehaviorBase';
import { TileManager, type FacingDirection } from './tileManager';
import { tileSize } from './tileSize';

export const itemList = ['ironOre', 'ironPlate', 'ironGear'] as const;
export type GameItem = (typeof itemList)[number];

export type Tile = {
	data: {
		building?: GameBuildingName;
		facing?: 'n' | 'e' | 's' | 'w';
		cooldown?: number;
		holding?: GameItem;
	};
};

export type GameMapType = Record<number, Record<number, TileManager>>;

export class GameMapManager {
	size = 10;
	private map: GameMapType;
	private canvasDimensions: {
		width: number;
		height: number;
	} = { width: 0, height: 0 };
	private playerData: {
		x: number;
		y: number;
		facing: number;
	};
	private cursorData: {
		x: number;
		y: number;
		selectedBuilding?: GameBuilding;
		selectedDirection: FacingDirection;
	} = { x: 0, y: 0, selectedDirection: 'n' };

	private tickables: Record<
		string,
		{
			x: number;
			y: number;
			tileManager: TileManager;
		}
	> = {};

	constructor() {
		this.map = {};
		this.playerData = {
			x: 0,
			y: 0,
			facing: 0
		};
	}

	generate(size: number) {
		this.size = size;
		for (let x = 0; x < size; x++) {
			this.map[x] = {};
			for (let y = 0; y < size; y++) {
				this.map[x][y] = new TileManager({
					facing: 'n',
					x,
					y
				});
			}
		}
	}

	getTile(x: number, y: number) {
		if (this.map[x] && this.map[x][y]) {
			return this.map[x][y];
		} else {
			return undefined;
		}
	}

	getSize() {
		return this.size;
	}

	setCanvasDimensions(width: number, height: number) {
		this.canvasDimensions.width = width;
		this.canvasDimensions.height = height;
	}

	tick(delta: number, tickId: number) {
		for (const item in this.tickables) {
			const tile = this.tickables[item];
			tile.tileManager.tick({
				mapManager: this,
				x: tile.x,
				y: tile.y,
				delta,
				tickId
			});
		}
	}

	place(item: TileManager, x: number, y: number) {
		this.map[x][y] = item;

		if (item.data.building) {
			this.tickables[`${x}-${y}`] = {
				x,
				y,
				tileManager: item
			};
		}
	}

	getPlayerData() {
		return this.playerData;
	}

	getPlayerPosition() {
		return {
			raw: {
				x: this.playerData.x,
				y: this.playerData.y
			},
			tile: {
				x: Math.floor(this.playerData.x / 32),
				y: Math.floor(this.playerData.y / 32)
			}
		};
	}

	addPlayerPosition(x: number, y: number) {
		this.playerData.x += x;
		this.playerData.y += y;

		this.playerData.x = Math.max(0, Math.min((this.size - 1) * tileSize, this.playerData.x));
		this.playerData.y = Math.max(0, Math.min((this.size - 1) * tileSize, this.playerData.y));
	}

	setCursorPosition(x: number, y: number) {
		this.cursorData.x = x;
		this.cursorData.y = y;
	}

	getTileDetails() {
		const xTiles = Math.ceil(this.canvasDimensions.width / tileSize);
		const yTiles = Math.ceil(this.canvasDimensions.height / tileSize);

		const xTilesHalf = Math.floor(xTiles / 2);
		const yTilesHalf = Math.floor(yTiles / 2);

		return {
			xTiles,
			yTiles,
			xTilesHalf,
			yTilesHalf
		};
	}

	getOffsets() {
		const playerPos = this.getPlayerPosition();
		const xOffsetTiles = playerPos.tile.x;
		const xOffsetPx = playerPos.raw.x % tileSize;

		const yOffsetTiles = playerPos.tile.y;
		const yOffsetPx = playerPos.raw.y % tileSize;

		return {
			xOffsetTiles,
			xOffsetPx,
			yOffsetTiles,
			yOffsetPx
		};
	}

	getCursorPosition() {
		return {
			raw: {
				x: this.cursorData.x,
				y: this.cursorData.y
			},
			tile: {
				x: Math.floor((this.cursorData.x + (this.playerData.x % tileSize)) / tileSize),
				y: Math.floor((this.cursorData.y + (this.playerData.y % tileSize)) / tileSize)
			}
		};
	}

	setSelectedBuilding(building: GameBuilding) {
		this.cursorData.selectedBuilding = building;
	}

	getSelectedBuilding() {
		return this.cursorData.selectedBuilding;
	}

	getSelectedTile() {
		const cursorData = this.getCursorPosition();
		const offsets = this.getOffsets();
		const tileDetails = this.getTileDetails();
		return this.getTile(
			cursorData.tile.x + offsets.xOffsetTiles - tileDetails.xTilesHalf,
			cursorData.tile.y + offsets.yOffsetTiles - tileDetails.yTilesHalf
		);
	}

	rotatePlacementDirection() {
		switch (this.cursorData.selectedDirection) {
			case 'n': {
				this.cursorData.selectedDirection = 'e';
				break;
			}
			case 'e': {
				this.cursorData.selectedDirection = 's';
				break;
			}
			case 's': {
				this.cursorData.selectedDirection = 'w';
				break;
			}
			case 'w': {
				this.cursorData.selectedDirection = 'n';
				break;
			}
		}
	}

	getRotationDirection() {
		return this.cursorData.selectedDirection;
	}

	handleClick() {
		if (this.cursorData.selectedBuilding) {
			const currentTile = this.getSelectedTile();

			if (currentTile) {
				const inRange = currentTile.inPlayerPlaceRange({ map: this });

				const validPlacement = this.cursorData.selectedBuilding.isValidPlacement({
					tile: currentTile,
					gameManager: this
				});

				if (validPlacement && inRange) {
					this.place(
						new TileManager({
							building: this.cursorData.selectedBuilding.new(),
							facing: this.cursorData.selectedDirection,
							x: currentTile.data.x,
							y: currentTile.data.y
						}),
						currentTile.data.x,
						currentTile.data.y
					);
				}
			}
		}
	}
}
