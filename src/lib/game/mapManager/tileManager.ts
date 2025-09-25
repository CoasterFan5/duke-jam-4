import type { GameBuilding } from '../gameBuildings/utils/BehaviorBase';
import type { GameItem, GameMapManager } from './mapManager';

export type FacingDirection = 'n' | 'e' | 's' | 'w';

type TileManagerData = {
	building?: GameBuilding;
	facing: FacingDirection;
	holding?: GameItem;
	lastTouchedByTick?: number;
};

export class TileManager {
	data: TileManagerData = {
		facing: 'n'
	};
	constructor(args: TileManagerData) {
		this.data = args;
	}

	tick(args: { mapManager: GameMapManager; x: number; y: number; delta: number; tickId: number }) {
		if (this.data.building) {
			this.data.building.tick({ ...args, ...{ thisTile: this } });
			this.data.lastTouchedByTick = args.tickId;
		}
	}

	canHoldItem(item: GameItem) {
		if (this.data.building) {
			return this.data.building.canAcceptItem({
				itemName: item,
				tile: this
			});
		} else {
			return !this.data.holding;
		}
	}

	setHolding(item: GameItem) {
		if (this.data.building) {
			this.data.building.placeAction?.({ thisTile: this });
		}
		this.data.holding = item;
		if (this.data.building) {
			this.data.building.postPlaceAction({ thisTile: this });
		}
	}

	clearHolding() {
		if (this.data.building) {
			this.data.building.placeAction?.({ thisTile: this });
		}
		this.data.holding = undefined;
	}

	setFacing(d: FacingDirection) {
		this.data.facing = d;
	}
}
