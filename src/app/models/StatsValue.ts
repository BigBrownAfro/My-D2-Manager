import { ValuePair } from './ValuePair';

export interface StatsValue{
    statId: string;
    basic: ValuePair;
    pga: ValuePair;
    weighted: ValuePair;
    activityId: number;
}