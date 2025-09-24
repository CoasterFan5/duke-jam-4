import { gameBuildingBehavior, type GameBuildingName } from '../gameBuildings/gameBuildings';
import type { GameItem, GameMapManager } from './mapManager';

export type FacingDirection = 'n' | 'e' | 's' | 'w';

type TileManagerData = {
	building?: GameBuildingName;
	facing: FacingDirection;
	cooldown?: number;
	holding?: GameItem;
	lastTouchedByTick?: number;
};

export class TileManager {
	data: TileManagerData = {
		facing: 'n'
	};

	constructor(args: TileManagerData) {
		this.data = args;
		if (args.building) {
			this.data.cooldown = gameBuildingBehavior[args.building].defaultCooldown;
		}
	}

	tick(args: { mapManager: GameMapManager; x: number; y: number; delta: number; tickId: number }) {
		if (this.data.building) {
			if (gameBuildingBehavior[this.data.building]) {
				if (this.data.cooldown) {
					this.data.cooldown -= args.delta;
					if (this.data.cooldown > 0) {
						return;
					}
					// The ticker is responsible for updating the cooldown
				}

				gameBuildingBehavior[this.data.building].tickAction({
					thisTile: this,
					tickId: args.tickId,
					mapManager: args.mapManager,
					x: args.x,
					y: args.y
				});

				this.data.lastTouchedByTick = args.tickId;
			}
		}
	}

	setHolding(item: GameItem) {
		if (this.data.building && gameBuildingBehavior[this.data.building]) {
			gameBuildingBehavior[this.data.building].placeAction?.({ thisTile: this });
		}
		this.data.holding = item;
	}

	clearHolding() {
		if (this.data.building && gameBuildingBehavior[this.data.building]) {
			gameBuildingBehavior[this.data.building].placeAction?.({ thisTile: this });
		}
		this.data.holding = undefined;
	}

	setFacing(d: FacingDirection) {
		this.data.facing = d;
	}
}
