type CustomKeyboardEvent = (args: { event: KeyboardEvent }) => void;

export class KeyboardManager {
	private activeKeys: Record<string, boolean> = {};
	private eventListeners: Record<string, CustomKeyboardEvent[]> = {};
	constructor() {
		this.activeKeys = {};
	}

	keyDown(e: KeyboardEvent) {
		console.warn(e.key.toLowerCase());
		if (!this.activeKeys) {
			return;
		}
		if (this.eventListeners[e.key.toLowerCase()]) {
			for (const item of this.eventListeners[e.key.toLowerCase()]) {
				item({
					event: e
				});
			}
		}
		this.activeKeys[e.key.toLowerCase()] = true;
		e.preventDefault();
	}
	keyUp(e: KeyboardEvent) {
		delete this.activeKeys[e.key.toLowerCase()];
		e.preventDefault();
	}

	onKeyDown(key: string, callback: CustomKeyboardEvent) {
		if (!this.eventListeners[key.toLowerCase()]) {
			this.eventListeners[key.toLocaleLowerCase()] = [];
		}
		this.eventListeners[key.toLowerCase()].push(callback);
	}

	isKeyActive(key: string) {
		return this.activeKeys[key.toLowerCase()];
	}
}
