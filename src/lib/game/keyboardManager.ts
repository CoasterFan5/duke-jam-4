export class KeyboardManager {
	private activeKeys: Record<string, boolean> = {};

	constructor() {
		this.activeKeys = {};
	}

	keyDown(e: KeyboardEvent) {
		console.warn(e.key.toLowerCase());
		if (!this.activeKeys) {
			return;
		}
		this.activeKeys[e.key.toLowerCase()] = true;
		e.preventDefault();
	}
	keyUp(e: KeyboardEvent) {
		delete this.activeKeys[e.key.toLowerCase()];
		e.preventDefault();
	}

	isKeyActive(key: string) {
		return this.activeKeys[key.toLowerCase()];
	}
}
