<script lang="ts">
	import type { GameMapManager } from './mapManager/mapManager';
	import playerImage from '$lib/assets/Player.png';
	import cursorImage from '$lib/assets/cursor.png';
	import cursorOutOfRangeImageData from '$lib/assets/cursor_out_of_range.png';
	import groundTile from '$lib/assets/ground.png';
	import { KeyboardManager } from './keyboardManager';
	import { tickPlayerMovement } from './playerManager/tickPlayerMovement';
	import { tileSize } from './mapManager/tileSize';
	import { renderTiles } from './renderHelpers/renderTiles';
	import { imageManipulationValues } from './renderHelpers/imageManipulationValues';

	const {
		mapManager,
		keyboardManager
	}: {
		mapManager: GameMapManager;
		keyboardManager: KeyboardManager;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	let groundTileHtmlImage: HTMLImageElement | undefined = undefined;

	const tickRender = () => {
		if (!groundTileHtmlImage) {
			groundTileHtmlImage = new Image();
			groundTileHtmlImage.src = groundTile;
		}

		if (canvas) {
			canvas.height = canvas.clientHeight;
			canvas.width = canvas.clientWidth;

			mapManager.setCanvasDimensions(canvas.height, canvas.width);

			const ctx = canvas.getContext('2d');
			if (ctx) {
				const tileDetails = mapManager.getTileDetails();
				const offsets = mapManager.getOffsets();

				renderTiles({
					canvas,
					ctx,
					mapManager,
					...tileDetails,
					...offsets
				});
				ctx.fillStyle = 'black';

				//render ghost
				const cPos = mapManager.getCursorPosition();
				const b = mapManager.getSelectedBuilding();
				if (b) {
					const imageManipulation = imageManipulationValues[mapManager.getRotationDirection()];
					ctx.save();
					ctx.translate(
						cPos.tile.x * tileSize - offsets.xOffsetPx,
						cPos.tile.y * tileSize - offsets.yOffsetPx
					);
					ctx.rotate(imageManipulation.r);
					ctx.globalAlpha = 0.5;
					const buildingImage = b.getRenderer();
					ctx.drawImage(buildingImage, imageManipulation.xOffset, imageManipulation.yOffset);
					ctx.restore();
				}

				//render cursor

				const selectedTile = mapManager.getSelectedTile();
				const cursorHtmlImage = new Image();
				if (selectedTile && !selectedTile.inPlayerPlaceRange({ map: mapManager })) {
					cursorHtmlImage.src = cursorOutOfRangeImageData;
				} else {
					cursorHtmlImage.src = cursorImage;
				}

				ctx.drawImage(
					cursorHtmlImage,
					cPos.tile.x * tileSize - offsets.xOffsetPx,
					cPos.tile.y * tileSize - offsets.yOffsetPx
				);

				//render player
				const playerHtmlImage = new Image();
				playerHtmlImage.src = playerImage;
				mapManager.getPlayerData();
				ctx.drawImage(
					playerHtmlImage,
					canvas.clientWidth / 2 - tileSize / 2,
					canvas.clientHeight / 2 - tileSize / 2
				);
			}
		}
	};

	let lastD = 0;
	const renderTickWrap = (d: number) => {
		const diff = d - lastD;
		mapManager.tick(diff, d);
		tickPlayerMovement(keyboardManager, mapManager, diff);
		lastD = d;

		if (diff > 16.6666666667) {
			console.warn('17ms tick');
		}

		tickRender();
		requestAnimationFrame((d) => {
			renderTickWrap(d);
		});
	};

	$effect(() => {
		renderTickWrap(0);
	});

	console.log(mapManager);
</script>

<canvas bind:this={canvas}> </canvas>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100vh;
	}
</style>
