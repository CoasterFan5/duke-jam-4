<script lang="ts">
	import { buildingColorMap, itemColorMap } from './colorMaps';
	import type { GameMapManager } from './mapManager/mapManager';

	const {
		mapManager
	}: {
		mapManager: GameMapManager;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	const tileSize = 32;

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
								ctx.fillStyle = buildingColorMap[t.data.building];
							} else {
								ctx.fillStyle = 'gray';
							}
							ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
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
