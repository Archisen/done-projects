import { Request, Response } from "express";
import * as jsforce from "jsforce";


const SF_TOKEN = process.env.REACT_APP_SF_TOKEN;
    const SF_LOGIN_URL: string = process.env.REACT_APP_SF_LOGIN_URL as string;
    const SF_USERNAME: string = process.env.REACT_APP_SF_USERNAME as string;
    const SF_PASSWORD: string = process.env.REACT_APP_SF_PASSWORD as string;

    const sfConn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL});

export const sfConnect = async (req:Request, res:Response) => {

    try {
        sfConn.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN,(err,userInfo)=>{
            if(err) return console.error(err);
            else{
                console.log("User Id: " + userInfo.id);
                console.log("Ord ID: " + userInfo.organizationId);
                console.log("URL: " + userInfo.url);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const sfTestQuery = async (req:Request, res:Response) => {
    sfConn.query('SELECT Id, Name FROM Accounts ', undefined, (err, result) =>{
            if(err) return console.log(err);
            const resAccounts = result.records;
        });
}