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



const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
// const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
// const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
// const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
