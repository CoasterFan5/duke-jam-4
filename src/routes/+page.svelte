<script lang="ts">
	import { GameMapManager } from '$lib/game/mapManager/mapManager';
	import { PLACE_HANDLERS } from '$lib/game/mapManager/placeHandlers';
	import MapRender from '$lib/game/MapRender.svelte';

	const map = new GameMapManager();
	map.generate(10);

	map.place(PLACE_HANDLERS.producer(), 0, 0, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 1, 0, 'e');
	map.place(PLACE_HANDLERS.conveyer(), 2, 0, 's');
	map.place(PLACE_HANDLERS.conveyer(), 2, 1, 'e');
	map.place(PLACE_HANDLERS.consumer(), 3, 1, 'e');
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
