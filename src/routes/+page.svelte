<script lang="ts">
	import { GameMapManager } from '$lib/game/mapManager/mapManager';
	import { PLACE_HANDLERS } from '$lib/game/mapManager/placeHandlers';
	import MapRender from '$lib/game/MapRender.svelte';

	const map = new GameMapManager();
	map.generate(10);

	map.place(PLACE_HANDLERS.producer(), 0, 0, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 1, 0, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 2, 0, 's');
	map.place(PLACE_HANDLERS.conveyer(), 2, 1, 's');
	map.place(PLACE_HANDLERS.conveyer(), 2, 2, 's');
	map.place(PLACE_HANDLERS.conveyer(), 2, 3, 'w');
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
	map.place(PLACE_HANDLERS.consumer(), 8, 3, 'e');
</script>

<MapRender mapManager={map} />

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
