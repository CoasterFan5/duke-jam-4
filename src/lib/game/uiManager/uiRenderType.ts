import type { Component, ComponentProps } from 'svelte';
import type CrafterUi from '../gameBuildings/crafter/CrafterUi.svelte';

export type ComponentUiExport<P extends Record<string, unknown>> = {
	component: Component<P>;
	props: P;
};

export type UiRenderType = undefined | ComponentUiExport<ComponentProps<typeof CrafterUi>>;
