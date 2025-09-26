import type { UiRenderType } from './uiRenderType';

export class UiManager {
	private ui: UiRenderType = undefined;
	private _needsRendering = false;

	constructor() {}

	setUi(uiRender: UiRenderType) {
		this.ui = uiRender;
		this._needsRendering = true;
	}

	clearUi() {
		this.ui = undefined;
		this._needsRendering = true;
	}

	getUi() {
		this._needsRendering = false;
		return this.ui;
	}

	hasUi() {
		return this.ui != undefined;
	}

	needsRendering(): boolean {
		return this._needsRendering;
	}
}
