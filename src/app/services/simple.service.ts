export class SimpleService {
    private token : string;
 
    public setToken(token:string){
        this.token=token;
    }

    public getToken():string{
        return this.token;
    }
}