import {conf} from"../conf/conf.js"
import { Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.projectId);
        this.account = new Account(this.client)   
    }

    async createAccount({email, password, name}){
        try {
             const obj = {
                email: email,
                password: password
             }
             const userAccount = await this.account.create(ID.unique(), email, password, name)
             
             console.log(conf.projectId);
              if(userAccount){               
                   return this.login(obj)
              }
              else{
                console.log("Error in createACC");
                 return userAccount
                //  console.log("Error in createACC");
              }

        } catch (error) {
             console.log("Error: Error in :: CreateAccount ", error);
        }
    }

    async login({email, password}){
        try {
            return this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            console.log("Error: Error in :: login ", error)
        }
    }

    async getCurrentUser() {
        try {
              return this.account.get()
        } catch (error) {
            
            console.log("Error: Error in :: getCurrentUser() ",error)
        }
    }

    async logout(){
        try {
            this.account.deleteSessions()
        } catch (e) {
            console.log("Error: Error in :: logout ",e)
        }
    }
}

const authService = new AuthService()

export default authService