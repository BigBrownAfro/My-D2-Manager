import { AllTimeStats } from './AllTimeStats';
import { CharacterStats } from './CharacterStats';

export interface AccountStats{
    Response:
    {
        characters: [CharacterStats],
        mergedAllCharacters: {
            results: {allPvP: {allTime: AllTimeStats}, allPvE: {allTime: AllTimeStats}};
            merged: {allTime: AllTimeStats};
        },
        mergedDeletedCharacters: {
            results: {allPvP: {allTime: AllTimeStats}, allPvE: {allTime: AllTimeStats}};
            merged: {allTime: AllTimeStats};
        }
    };
    ErrorCode: number;
    ThrottleSeconds:number;
    ErrorStatus:string;
    Message:string;
    MessageData:object;
    DetailedErrorTrace:string;
}