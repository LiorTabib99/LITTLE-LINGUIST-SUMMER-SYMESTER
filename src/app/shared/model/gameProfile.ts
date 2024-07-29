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



const TranslateGasme = new  gameProfile(111, "Translate Game","Translate words","translate")
const SortWords = new  gameProfile(222, "Sord words Game","Translate words","")
// const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
// const TranslateGasme = new  gameProfile(1, "Translate Game","Translate words","")
