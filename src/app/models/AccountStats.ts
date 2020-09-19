import { AllTimeStats } from './AllTimeStats';
import { CharacterStats } from './CharacterStats';

export interface AccountStats{
    characters: [CharacterStats],
    mergedAllCharacters: {
        results: {allPvP: {allTime: AllTimeStats}, allPvE: {allTime: AllTimeStats}};
        merged: {allTime: AllTimeStats};
    },
    mergedDeletedCharacters: {
        results: {allPvP: {allTime: AllTimeStats}, allPvE: {allTime: AllTimeStats}};
        merged: {allTime: AllTimeStats};
    }
}