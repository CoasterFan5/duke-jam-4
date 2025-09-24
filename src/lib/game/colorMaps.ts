import type { GameBuildingName } from './gameBuildings/gameBuildings';
import type { GameItem } from './mapManager/mapManager';

export const buildingColorMap: Record<GameBuildingName, string> = {
	consumer: 'red',
	conveyer: 'yellow',
	producer: 'blue',
	inserter: 'pink'
};

export const itemColorMap: Record<GameItem, string> = {
	ironOre: 'white',
	ironPlate: '#808080'
};
