import { Competition } from "./competition";
import { Fighter } from "./fighter";
import { Ranking } from "./ranking";

/*  
* Custom Response interface for HTTP Requests
*/
export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    devMessage: string;
    data: { fighters?: Fighter[], fighter?: Fighter, competitions?: Competition[], rankings?: Ranking[] }
}