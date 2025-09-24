<script lang="ts">
	import { itemColorMap } from './colorMaps';
	import { gameBuildingBehavior } from './gameBuildings/gameBuildings';
	import type { GameMapManager } from './mapManager/mapManager';
	import type { FacingDirection } from './mapManager/tileManager';
	import playerImage from '$lib/assets/Player.png';
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

	const tickRender = () => {
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
						if (t) {
							if (t.data.building) {
								const renderer = gameBuildingBehavior[t.data.building].renderer;
								ctx.save();
								const manipulationValues = imageManipulationValues[t.data.facing];
								ctx.translate(x * tileSize, y * tileSize);
								ctx.rotate(manipulationValues.r);
								ctx.translate(manipulationValues.xOffset, manipulationValues.yOffset);
								const img = new Image();
								img.src = renderer;
								ctx.drawImage(img, 0, 0);
								ctx.restore();
							} else {
								ctx.fillStyle = 'gray';
								ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
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
