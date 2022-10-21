import { Fighter } from "./fighter";

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
    data: { fighters?: Fighter[], fighter?: Fighter, competitions?: Competition[] }
}