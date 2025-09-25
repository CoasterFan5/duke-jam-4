<script lang="ts">
	import { gameBuildingBehavior, gameBuildings } from '../gameBuildings/gameBuildings';
	import type { GameMapManager } from '../mapManager/mapManager';

	const {
		mapManager
	}: {
		mapManager: GameMapManager;
	} = $props();
</script>

<div class="wrap">
	{#each gameBuildings as b (b)}
		{@const building = new gameBuildingBehavior[b]()}
		{@const buildingImage = building.getRenderer()}
		<button
			class="item"
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				mapManager.setSelectedBuilding(building);
			}}
		>
			<img src={buildingImage.src} alt={b} />
		</button>
	{/each}
</div>

<style lang="scss">
	.wrap {
		position: fixed;
		display: flex;
		flex-direction: row;
		left: 50%;
		bottom: 1rem;
		border: 3px solid black;
		border-right: 0px solid black;
		transform: translate(-50%, 0);
	}
	.item {
		all: unset;
		display: flex;
		box-sizing: border-box;
		height: 50px;
		width: 53px;
		background: rgba(0, 0, 0, 0.2);
		border-right: 3px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
