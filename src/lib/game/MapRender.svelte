<script lang="ts">
	import { itemColorMap } from './colorMaps';
	import type { GameMapManager } from './mapManager/mapManager';
	import type { FacingDirection } from './mapManager/tileManager';
	import playerImage from '$lib/assets/Player.png';
	import cursorImage from '$lib/assets/cursor.png';
	import cursorOutOfRangeImageData from '$lib/assets/cursor_out_of_range.png';
	import groundTile from '$lib/assets/ground.png';
	import { KeyboardManager } from './keyboardManager';
	import { tickPlayerMovement } from './playerManager/tickPlayerMovement';
	import { tileSize } from './mapManager/tileSize';

	const {
		mapManager,
		keyboardManager
	}: {
		mapManager: GameMapManager;
		keyboardManager: KeyboardManager;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	const imageManipulationValues: Record<
		FacingDirection,
		{
			r: number;
			xOffset: number;
			yOffset: number;
		}
	> = {
		n: {
			r: 0,
			xOffset: 0,
			yOffset: 0
		},
		e: {
			r: Math.PI / 2,
			xOffset: 0,
			yOffset: -32
		},
		s: {
			r: Math.PI,
			xOffset: -32,
			yOffset: -32
		},
		w: {
			r: Math.PI * 1.5,
			xOffset: -32,
			yOffset: 0
		}
	};

	let groundTileHtmlImage: HTMLImageElement | undefined = undefined;

	const tickRender = () => {
		if (!groundTileHtmlImage) {
			groundTileHtmlImage = new Image();
			groundTileHtmlImage.src = groundTile;
		}

		const size = mapManager.getSize();
		const playerData = mapManager.getPlayerData();
		if (canvas) {
			canvas.height = canvas.clientHeight;
			canvas.width = canvas.clientWidth;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				for (let x = 0; x < size; x++) {
					for (let y = 0; y < size; y++) {
						const t = mapManager.getTile(x, y);
						// draw the ground
						// ctx.drawImage(groundTileHtmlImage, x * tileSize, y * tileSize);
						ctx.fillStyle = '#43264C';
						ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
						if (t) {
							if (t.data.building) {
								const renderer = t.data.building.getRenderer();
								ctx.save();
								const manipulationValues = imageManipulationValues[t.data.facing];
								ctx.translate(x * tileSize, y * tileSize);
								ctx.rotate(manipulationValues.r);
								ctx.translate(manipulationValues.xOffset, manipulationValues.yOffset);
								ctx.drawImage(renderer, 0, 0);
								ctx.restore();
							}
							if (t.data.holding) {
								ctx.fillStyle = itemColorMap[t.data.holding];
								ctx.fillRect(
									x * tileSize + tileSize / 4,
									y * tileSize + tileSize / 4,
									tileSize / 2,
									tileSize / 2
								);
							}
						}
					}
				}

				//render ghost
				const cPos = mapManager.getCursorPosition();
				const b = mapManager.getSelectedBuilding();
				if (b) {
					const imageManipulation = imageManipulationValues[mapManager.getRotationDirection()];
					ctx.save();
					ctx.translate(cPos.tile.x * tileSize, cPos.tile.y * tileSize);
					ctx.rotate(imageManipulation.r);
					ctx.globalAlpha = 0.5;
					const buildingImage = b.getRenderer();
					ctx.drawImage(buildingImage, imageManipulation.xOffset, imageManipulation.yOffset);
					ctx.restore();
				}

				//render cursor

				const selectedTile = mapManager.getTile(cPos.tile.x, cPos.tile.y);
				const cursorHtmlImage = new Image();
				if (selectedTile && !selectedTile.inPlayerPlaceRange({ map: mapManager })) {
					cursorHtmlImage.src = cursorOutOfRangeImageData;
				} else {
					cursorHtmlImage.src = cursorImage;
				}

				ctx.drawImage(cursorHtmlImage, cPos.tile.x * tileSize, cPos.tile.y * tileSize);

				//render player
				const playerHtmlImage = new Image();
				playerHtmlImage.src = playerImage;
				mapManager.getPlayerData();
				ctx.drawImage(playerHtmlImage, playerData.x, playerData.y);
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
