import type { GameItem } from '../../mapManager/mapManager';
import imageData from '$lib/assets/Crafter.png';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type GetUiParams,
	type OnClickParams,
	type PlaceActionParams,
	type TickMethodParams
} from '../utils/BehaviorBase';
import { getNextTile } from '../utils/getDirectionTile';
import CrafterUi from './CrafterUi.svelte';
import { craftingRecipies, type RecipieName } from './recipies';

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
		},
		ironRod: {
			count: 0,
			max: 10
		},
		copperOre: {
			count: 0,
			max: 10
		}
	};

	private selectedRecipie?: RecipieName = 'ironGear';

	constructor() {
		super();
	}

	override new() {
		return new Crafter();
	}

	override tick({ x, y, thisTile, mapManager }: TickMethodParams) {
		if (this.selectedRecipie) {
			const recipie = craftingRecipies[this.selectedRecipie];

			const realCounts: Partial<Record<GameItem, { seen: boolean; realCount: number }>> = {};
			let allowed = true;

			for (const item of recipie.requirements) {
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
				const product = recipie.product;
				const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
				if (nextTile && nextTile.canHoldItem(product)) {
					nextTile.setHolding(product);
					for (const item of recipie.requirements) {
						this.storage[item].count -= 1;
					}
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

	override getUi({ uiManager }: GetUiParams) {
		return {
			component: CrafterUi,
			props: {
				uiManager,
				crafter: this
			}
		};
	}

	onClick({ mapManager }: OnClickParams): void {
		mapManager.uiManager.setUi(
			this.getUi({
				uiManager: mapManager.uiManager
			})
		);
	}

	setRecipie(name: RecipieName) {
		this.selectedRecipie = name;
	}
}
