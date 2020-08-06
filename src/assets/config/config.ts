import { config } from 'process'

export interface Config
{
    server: string;   
    //port: number;   
    //settings: string[];
}

export const MyConfig = {
    server : "http://127.0.0.1:5000/" 
}