import pg from 'pg';
import config from 'dotenv'


export class DBConnector {
    
    constructor(){
        // this.connect = pg.connect();
        this.configString = config['PG_CONNECT'];
        
    }

    // callback takes client object
    _connect(err, callback){
        pg.connect(this.configString, (err, client, done) => {
                
            if(err){
                    err();
                    return;
                }
            callback(client);
            done()
            return

        });
    }

    _query(){

    }

    run(err, callback){
       return this._connect(err, callback);
    }


    tester(){
      
        return `Testing DBConncter! ` ; 
        // ${config['PG_CONNET']}
    }


}