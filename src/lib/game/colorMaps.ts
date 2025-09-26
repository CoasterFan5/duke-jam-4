import type { GameItem } from './mapManager/mapManager';
import ironOreImageData from '$lib/assets/items/iron_ore.png';
import ironPlateImageData from '$lib/assets/items/Iron Plate.png';
import ironGearImageData from '$lib/assets/items/Iron Gear.png';
import ironRodImageData from '$lib/assets/items/Iron Rod.png';
import copperOreImageData from '$lib/assets/items/Copper Ore.png';

const ironOreImage = new Image();
ironOreImage.src = ironOreImageData;

const ironPlateImage = new Image();
ironPlateImage.src = ironPlateImageData;

const ironGearImage = new Image();
ironGearImage.src = ironGearImageData;

const ironRodImage = new Image();
ironRodImage.src = ironRodImageData;

const copperOreImage = new Image();
copperOreImage.src = copperOreImageData;

export const itemImageMap: Record<GameItem, HTMLImageElement> = {
	ironOre: ironOreImage,
	ironPlate: ironPlateImage,
	ironGear: ironGearImage,
	ironRod: ironRodImage,
	copperOre: copperOreImage
};
