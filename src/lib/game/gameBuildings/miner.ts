import { getNextTile } from './utils/getDirectionTile';
import imageData from '$lib/assets/Miner.png';

import { GameBuilding, type TickMethodParams } from './utils/BehaviorBase';

export class Miner extends GameBuilding {
	private htmlImage: HTMLImageElement | undefined = undefined;
	private cooldown = 0;
	private DEFAULT_COOLDOWN = 5_000;
	constructor() {
		super();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	new() {
		return new Miner();
	}

	tick({ thisTile, mapManager, x, y, delta }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			const nt = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (nt && !nt.data.holding && nt.data.building) {
				nt.setHolding('ironOre');
				this.cooldown = this.DEFAULT_COOLDOWN;
			}
		}
	}

	placeAction() {}

	getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = imageData;
		}
		return this.htmlImage;
	}
}
