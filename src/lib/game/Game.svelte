<script lang="ts">
	import { KeyboardManager } from '$lib/game/keyboardManager';
	import { GameMapManager } from '$lib/game/mapManager/mapManager';
	import { PLACE_HANDLERS } from '$lib/game/mapManager/placeHandlers';
	import MapRender from '$lib/game/MapRender.svelte';
	import Hotbar from './hotbar/Hotbar.svelte';

	const map = new GameMapManager();
	map.generate(250);

	map.place(PLACE_HANDLERS.miner(), 0, 0, 'e');
	map.place(PLACE_HANDLERS.miner(), 2, 0, 'w');
	map.place(PLACE_HANDLERS.conveyer(), 1, 0, 's');
	map.place(PLACE_HANDLERS.conveyer(), 1, 1, 's');
	map.place(PLACE_HANDLERS.conveyer(), 1, 2, 's');
	map.place(PLACE_HANDLERS.conveyer(), 1, 3, 'w');
	map.place(PLACE_HANDLERS.conveyer(), 0, 3, 's');
	map.place(PLACE_HANDLERS.conveyer(), 0, 4, 's');
	map.place(PLACE_HANDLERS.conveyer(), 0, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 1, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 2, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 3, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 4, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 5, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 6, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 7, 5, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 8, 5, 'n');
	map.place(PLACE_HANDLERS.conveyer(), 8, 4, 'n');
	//
	map.place(PLACE_HANDLERS.furnace(), 8, 3, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 9, 3, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 10, 3, 'e');

	const keyboardManager = new KeyboardManager();

	$effect(() => {
		document.addEventListener('keydown', (e) => {
			keyboardManager.keyDown(e);
		});
		document.addEventListener('keyup', (e) => {
			keyboardManager.keyUp(e);
		});
		document.addEventListener('mousemove', (e) => {
			map.setCursorPosition(e.clientX, e.clientY);
		});

		document.addEventListener('click', (e) => {
			map.handleClick(e);
		});
	});

	keyboardManager.onKeyDown('r', () => {
		map.rotatePlacementDirection();
	});
</script>

<MapRender mapManager={map} {keyboardManager} />
<Hotbar mapManager={map} />

<style lang="scss">
	:global(body) {
		background: black;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
