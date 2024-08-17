import { wordStatus } from "./wordStatus";

export interface hebrewWord{
    origin : string,
    translated : string,
    status : wordStatus,
    guess? : string,
    attemptsLeft : number
}