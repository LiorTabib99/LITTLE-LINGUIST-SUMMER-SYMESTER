export class gameProfile{
    gameID : number;
    gameName : string;
    description : string;
    urlAddress : string;

    constructor( 
        gameID : number,
        gameName : string,
        description : string,
        urlAddress : string
    ){
        this.gameID = gameID;
        this.gameName = gameName;
        this.description = description;
        this.urlAddress = urlAddress;
    }
}



// export interface gameProfile {
//     id: number;
//     name: string;
//     lastUpdateDate: Date;
//   }