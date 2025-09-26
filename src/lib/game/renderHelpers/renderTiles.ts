import { itemImageMap } from '../colorMaps';
import type { GameMapManager } from '../mapManager/mapManager';
import { tileSize } from '../mapManager/tileSize';
import { imageManipulationValues } from './imageManipulationValues';
import ironOreImageData from '$lib/assets/tiles/iron_ore.png';
import copperOreImageData from '$lib/assets/tiles/Copper Ore.png';

const ironOreTileImage = new Image();
ironOreTileImage.src = ironOreImageData;

const copperOreTileImage = new Image();
copperOreTileImage.src = copperOreImageData;

type RenderTilesParams = {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	mapManager: GameMapManager;
	xTiles: number;
	yTiles: number;
	xTilesHalf: number;
	yTilesHalf: number;
	xOffsetTiles: number;
	xOffsetPx: number;
	yOffsetTiles: number;
	yOffsetPx: number;
};

export const renderTiles = ({
	ctx,
	mapManager,
	xTiles,
	yTiles,
	xTilesHalf,
	yTilesHalf,
	xOffsetTiles,
	yOffsetTiles,
	xOffsetPx,
	yOffsetPx
}: RenderTilesParams) => {
	for (let x = -1; x < xTiles + 1; x++) {
		for (let y = -1; y < yTiles + 1; y++) {
			const t = mapManager.getTile(x + xOffsetTiles - xTilesHalf, y + yOffsetTiles - yTilesHalf);

			const trueRenderX = Math.round(x * tileSize - xOffsetPx);
			const trueRenderY = Math.round(y * tileSize - yOffsetPx);

			if (t) {
				ctx.fillStyle = '#43264C';
				ctx.fillRect(trueRenderX, trueRenderY, tileSize, tileSize);

				if (t.data.terrain) {
					switch (t.data.terrain) {
						case 'iron_ore': {
							ctx.drawImage(ironOreTileImage, trueRenderX, trueRenderY);
							break;
						}
						case 'copper_ore': {
							ctx.drawImage(copperOreTileImage, trueRenderX, trueRenderY);
							break;
						}
					}
				}

				if (t.data.building) {
					const renderer = t.data.building.getRenderer();
					ctx.save();
					const manipulationValues = imageManipulationValues[t.data.facing];
					ctx.translate(trueRenderX, trueRenderY);
					ctx.rotate(manipulationValues.r);
					ctx.translate(manipulationValues.xOffset, manipulationValues.yOffset);
					ctx.drawImage(renderer, 0, 0);
					ctx.restore();
				}

				if (t.data.holding) {
					const img = itemImageMap[t.data.holding];
					ctx.drawImage(img, trueRenderX, trueRenderY);
				}
			}
		}
	}

	return;
};
