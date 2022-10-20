import { Beer } from "./beer";

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
    data: { beers?: Beer[], beer?: Beer }
}