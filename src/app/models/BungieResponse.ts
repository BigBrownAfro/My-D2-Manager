export interface BungieResponse{
    Response:{};
    ErrorCode: number;
    ThrottleSeconds:number;
    ErrorStatus:string;
    Message:string;
    MessageData:object;
    DetailedErrorTrace:string;
}