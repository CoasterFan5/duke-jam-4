import { getNextTile } from './utils/getDirectionTile';
import b from '$lib/assets/Belt.png';
import {
	GameBuilding,
	type IsValidPlacementParams,
	type TickMethodParams
} from './utils/BehaviorBase';

export class Conveyer extends GameBuilding {
	private DEFAULT_COOLDOWN = 1_000;
	private cooldown = 0;
	private htmlImage: HTMLImageElement | undefined = undefined;

	constructor() {
		super();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	new() {
		return new Conveyer();
	}

	override tick({ thisTile, mapManager, x, y, delta }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (nextTile && !nextTile.data.holding && thisTile.data.holding && nextTile.data.building) {
				nextTile.setHolding(thisTile.data.holding);
				thisTile.clearHolding();
			}
		}
	}

	override isValidPlacement({ tile }: IsValidPlacementParams) {
		return !tile.data.building;
	}

	override placeAction() {
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	override getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = b;
		}
		return this.htmlImage;
	}
}
