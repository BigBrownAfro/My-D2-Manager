import { AllTimeStats } from "./AllTimeStats";

export interface CharacterStats{
    characterId: string;
    deleted: boolean;
    results: {allPvP: {allTime: AllTimeStats}, allPvE: {allTime: AllTimeStats}};
    merged: {allTime: AllTimeStats};
}