import type { KeyboardManager } from '../keyboardManager';
import type { GameMapManager } from '../mapManager/mapManager';

const playerSpeed = 128; //px / s

export const tickPlayerMovement = (
	keyManager: KeyboardManager,
	mapManager: GameMapManager,
	delta: number
) => {
	const realDelta = delta / 1_000;
	if (keyManager.isKeyActive('S') || keyManager.isKeyActive('arrowdown')) {
		mapManager.addPlayerPosition(0, realDelta * playerSpeed);
	}
	if (keyManager.isKeyActive('W') || keyManager.isKeyActive('arrowup')) {
		mapManager.addPlayerPosition(0, -realDelta * playerSpeed);
	}
	if (keyManager.isKeyActive('A') || keyManager.isKeyActive('arrowleft')) {
		mapManager.addPlayerPosition(-realDelta * playerSpeed, 0);
	}
	if (keyManager.isKeyActive('D') || keyManager.isKeyActive('arrowright')) {
		mapManager.addPlayerPosition(realDelta * playerSpeed, 0);
	}

	if (keyManager.isKeyActive('escape')) {
		mapManager.clearSelectedBuilding();
		if (mapManager.uiManager.hasUi()) {
			mapManager.uiManager.clearUi();
		}
	}
};
