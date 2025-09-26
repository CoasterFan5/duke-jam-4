import { itemColorMap } from '../colorMaps';
import type { GameMapManager } from '../mapManager/mapManager';
import { tileSize } from '../mapManager/tileSize';
import { imageManipulationValues } from './imageManipulationValues';

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
		for (let y = -1; y < yTiles + 4; y++) {
			const t = mapManager.getTile(x + xOffsetTiles - xTilesHalf, y + yOffsetTiles - yTilesHalf);
			// draw the ground
			// ctx.drawImage(groundTileHtmlImage, x * tileSize, y * tileSize);
			//
			const trueRenderX = Math.floor(x * tileSize - xOffsetPx);
			const trueRenderY = Math.floor(y * tileSize - yOffsetPx);

			if (t) {
				ctx.fillStyle = '#43264C';
				ctx.fillRect(trueRenderX, trueRenderY, tileSize, tileSize);
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
					ctx.fillStyle = itemColorMap[t.data.holding];
					ctx.fillRect(
						trueRenderX + tileSize / 4,
						trueRenderY + tileSize / 4,
						tileSize / 2,
						tileSize / 2
					);
				}
			}
		}
	}

	return;
};
