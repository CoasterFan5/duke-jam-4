import { type GameBuildingName } from '../gameBuildings/gameBuildings';
import { TileManager, type FacingDirection } from './tileManager';

export const itemList = ['ironOre', 'ironPlate'] as const;
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
	private playerData: {
		x: number;
		y: number;
		facing: number;
	};
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
					facing: 'n'
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

	place(item: TileManager, x: number, y: number, facing: FacingDirection) {
		item.setFacing(facing);
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

	addPlayerPosition(x: number, y: number) {
		this.playerData.x += x;
		this.playerData.y += y;
	}
}
