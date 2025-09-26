<script lang="ts">
	const { children } = $props();
</script>

<div class="base">
	{@render children?.()}
</div>

<style lang="scss">
	.base {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
