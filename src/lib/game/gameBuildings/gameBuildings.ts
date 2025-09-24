import type { GameMapManager } from '../mapManager/mapManager';
import type { TileManager } from '../mapManager/tileManager';
import { conveyer } from './conveyer';
import { getNextTile } from './utils/getDirectionTile';

export const gameBuildings = ['conveyer', 'producer', 'consumer', 'inserter'] as const;

export type GameBuildingName = (typeof gameBuildings)[number];

export type GameBuildingBehavior = {
	tickAction: (params: {
		thisTile: TileManager;
		mapManager: GameMapManager;
		x: number;
		y: number;
		tickId: number;
	}) => void;
	placeAction?: (params: { thisTile: TileManager }) => void;
	defaultCooldown: number;
};

export const gameBuildingBehavior: Record<GameBuildingName, GameBuildingBehavior> = {
	conveyer: conveyer,
	producer: {
		tickAction: ({ thisTile, x, y, mapManager }) => {
			const nt = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (nt && !nt.data.holding) {
				nt.setHolding('ironOre');
			}
		},
		defaultCooldown: 1_000
	},
	consumer: {
		tickAction: () => {},
		defaultCooldown: 1_000
	},
	inserter: {
		tickAction: ({ thisTile }) => {
			thisTile.setHolding('ironOre');
		},
		defaultCooldown: 1_000
	}
};
