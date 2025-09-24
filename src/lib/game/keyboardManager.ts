export class KeyboardManager {
	private activeKeys: Record<string, boolean> = {};

	constructor() {
		this.activeKeys = {};
	}

	keyDown(e: KeyboardEvent) {
		if (!this.activeKeys) {
			return;
		}
		this.activeKeys[e.key.toLowerCase()] = true;
	}
	keyUp(e: KeyboardEvent) {
		delete this.activeKeys[e.key.toLowerCase()];
	}

	isKeyActive(key: string) {
		return this.activeKeys[key.toLowerCase()];
	}
}
