<script lang="ts">
	import { buildingColorMap, itemColorMap } from './colorMaps';
	import { gameBuildingBehavior } from './gameBuildings/gameBuildings';
	import type { GameMapManager } from './mapManager/mapManager';
	import type { FacingDirection } from './mapManager/tileManager';

	const {
		mapManager
	}: {
		mapManager: GameMapManager;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	const tileSize = 32;

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
								if (renderer) {
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
									ctx.fillStyle = buildingColorMap[t.data.building];
									ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
								}
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
			}
		}
	};

	let lastD = 0;
	const renderTickWrap = (d: number) => {
		const diff = d - lastD;
		mapManager.tick(diff, d);
		lastD = d;

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
