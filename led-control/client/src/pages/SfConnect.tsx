import dotenv from 'dotenv';
import * as jsforce from 'jsforce';
import { useState, useEffect } from 'react';



function SfConnect() {
    dotenv.config();
    // const SF_TOKEN = process.env.SF_TOKEN;
    // const SF_LOGIN_URL: string = process.env.SF_LOGIN_URL as string;
    // const SF_USERNAME: string = process.env.SF_USERNAME as string;
    // const SF_PASSWORD: string = process.env.SF_PASSWORD as string;
    
    // const sfConn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL});

    const [accounts, setAccounts] = useState<any[]>([]);
    
    // useEffect(() =>{
    

    //     sfConn.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN,(err,userInfo)=>{
    //         if(err) return console.error(err);
    //         else{
    //             console.log("User Id: " + userInfo.id);
    //             console.log("Ord ID: " + userInfo.organizationId);
    //             console.log("URL: " + userInfo.url);
    //         }
    //     });
        
    // }, []);

    const getAccounts = () => {
        // sfConn.query('SELECT Id, Name FROM Accounts ', undefined, (err, res) =>{
        //     if(err) return console.log(err);
        //     const resAccounts = res.records;
        //     setAccounts(resAccounts);
        // });
    }

    return(
        <div>
            <h1>Salesforce accounts</h1>
            <button onClick={getAccounts}>Click to get accounts</button>
            {/* <ul>
                {accounts.map((account) => (
                    <li key={account.Id}>{account.Name}</li>
                ))}
            </ul> */}
        </div>
    )
}

export default SfConnect;