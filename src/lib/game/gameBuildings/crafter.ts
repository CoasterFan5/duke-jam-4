import type { GameItem } from '../mapManager/mapManager';
import imageData from '$lib/assets/Crafter.png';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type IsValidPlacementParams,
	type PlaceActionParams,
	type TickMethodParams
} from './utils/BehaviorBase';
import { getNextTile } from './utils/getDirectionTile';

const recipies: [GameItem[], GameItem][] = [[['ironPlate', 'ironPlate'], 'ironGear']];
let image: HTMLImageElement | undefined = undefined;

export class Crafter extends GameBuilding {
	private storage: Record<GameItem, { count: number; max: number }> = {
		ironOre: {
			count: 0,
			max: 0
		},
		ironPlate: {
			count: 0,
			max: 10
		},
		ironGear: {
			count: 0,
			max: 10
		}
	};

	private selectedRecipie = 0;

	constructor() {
		super();
	}

	override new() {
		return new Crafter();
	}

	override tick({ x, y, thisTile, mapManager }: TickMethodParams) {
		const recipie = recipies[this.selectedRecipie];

		const realCounts: Partial<Record<GameItem, { seen: boolean; realCount: number }>> = {};
		let allowed = true;

		for (const item of recipie[0]) {
			if (!realCounts[item]) {
				realCounts[item] = {
					seen: true,
					realCount: this.storage[item].count
				};
			}
			realCounts[item].realCount -= 1;
			if (realCounts[item].realCount < 0) {
				allowed = false;
				break;
			}
		}

		if (allowed) {
			const product = recipie[1];
			const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (nextTile && nextTile.canHoldItem(product)) {
				nextTile.setHolding(product);
				for (const item of recipie[0]) {
					this.storage[item].count -= 1;
				}
			}
		}
	}

	override placeAction(): void {}

	override postPlaceAction({ thisTile }: PlaceActionParams): void {
		if (thisTile.data.holding) {
			this.storage[thisTile.data.holding].count += 1;
			thisTile.clearHolding();
		}
	}

	override isValidPlacement({ tile }: IsValidPlacementParams): boolean {
		return !tile.data.building;
	}

	override getRenderer(): HTMLImageElement {
		if (!image) {
			image = new Image();
			image.src = imageData;
		}
		return image;
	}

	override canAcceptItem({ tile, itemName }: CanAcceptItemParams): boolean {
		if (tile.data.holding) {
			return false;
		}

		if (this.storage[itemName].count >= this.storage[itemName].max) {
			return false;
		}

		return true;
	}
}
