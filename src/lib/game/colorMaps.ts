import type { GameItem } from './mapManager/mapManager';
import ironOreImageData from '$lib/assets/items/iron_ore.png';
import ironPlateImageData from '$lib/assets/items/Iron Plate.png';
import ironGearImageData from '$lib/assets/items/Iron Gear.png';

const ironOreImage = new Image();
ironOreImage.src = ironOreImageData;

const ironPlateImage = new Image();
ironPlateImage.src = ironPlateImageData;

const ironGearImage = new Image();
ironGearImage.src = ironGearImageData;

export const itemImageMap: Record<GameItem, HTMLImageElement> = {
	ironOre: ironOreImage,
	ironPlate: ironPlateImage,
	ironGear: ironGearImage
};
