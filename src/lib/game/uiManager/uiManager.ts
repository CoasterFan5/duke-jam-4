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
		return this.ui;
		this._needsRendering = false;
	}

	needsRendering(): boolean {
		return this._needsRendering;
	}
}
