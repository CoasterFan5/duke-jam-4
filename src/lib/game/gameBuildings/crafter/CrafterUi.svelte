<script lang="ts">
	import { itemImageMap } from '$lib/game/colorMaps';
	import UiBase from '$lib/game/uiManager/UiBase.svelte';
	import type { UiManager } from '$lib/game/uiManager/uiManager';
	import type { Crafter } from './crafter';
	import { craftingRecipieNames, craftingRecipies } from './recipies';

	const {
		crafter,
		uiManager
	}: {
		uiManager: UiManager;
		crafter: Crafter;
	} = $props();
</script>

<UiBase>
	<div class="recipieOptions">
		{#each craftingRecipieNames as rName (rName)}
			{@const recipieDetails = craftingRecipies[rName]}
			<button
				class="recipie"
				onclick={() => {
					crafter.setRecipie(rName);
					uiManager.clearUi();
				}}
			>
				<img src={itemImageMap[recipieDetails.product].src} alt={recipieDetails.product} />
			</button>
		{/each}
	</div>
</UiBase>

<style lang="scss">
	.recipieOptions {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
		width: 50%;
		height: 50%;
		background: #585652;
		padding: 0.25rem;
		gap: 0.1rem;
	}

	.recipie {
		all: unset;

		--c: #343e3b;
		--cW: color-mix(in srgb, 2% white, #343e3b);
		padding: 0.25rem;
		width: 2rem;
		height: calc(2rem + 2px);
		box-sizing: border-box;
		background-image: linear-gradient(0deg, var(--cW), var(--c));
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);

		img {
			height: 100%;
			width: 100%;
		}
	}
</style>
