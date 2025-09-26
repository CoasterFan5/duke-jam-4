import type { FacingDirection } from '../mapManager/tileManager';

export const imageManipulationValues: Record<
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
