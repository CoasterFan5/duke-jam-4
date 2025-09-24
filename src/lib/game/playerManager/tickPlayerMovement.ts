import type { KeyboardManager } from '../keyboardManager';
import type { GameMapManager } from '../mapManager/mapManager';

const playerSpeed = 128; //px / s

export const tickPlayerMovement = (
	keyManager: KeyboardManager,
	mapManager: GameMapManager,
	delta: number
) => {
	const realDelta = delta / 1_000;
	if (keyManager.isKeyActive('S')) {
		mapManager.addPlayerPosition(0, realDelta * playerSpeed);
	}
	if (keyManager.isKeyActive('W')) {
		mapManager.addPlayerPosition(0, -realDelta * playerSpeed);
	}
	if (keyManager.isKeyActive('A')) {
		mapManager.addPlayerPosition(-realDelta * playerSpeed, 0);
	}
	if (keyManager.isKeyActive('D')) {
		mapManager.addPlayerPosition(realDelta * playerSpeed, 0);
	}
};
