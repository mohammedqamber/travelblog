import {conf} from"../conf/conf.js"
import { Client, ID, Databases, Query, Storage} from 'appwrite';


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.projectId)
        
        this.databases = new Databases(this.client) 
        this.bucket = new Storage(this.client)
         
    }
   
    // Database Services

    async createPost({title, slug, content, img, userID, status, author}){
           try {

           return await this.databases.createDocument(
                conf.dbId,
                conf.collectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    img,
                    userID,
                    status,
                    author
                }
            )
            
           } catch (e) {
               console.log("Appwrite Service :: createPost :: Error", e);
           }
    }

    async updatePost(slug , {title, content, img, status}){
            try {

                return await this.databases.updateDocument(
                    conf.dbId,
                    conf.collectionId,
                    slug,
                    {
                        title,
                        content,
                        img,
                        status
                    }
                )
                
            } catch (e) {
                console.log("Appwrite Service :: updatePost :: Error", e);
            }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.dbId,
                conf.collectionId,
                slug
            )
            return true
        } catch (e) {
             console.log("Appwrite service :: deletePost :: error ", e);
             return false
        }
    }

    async getPost(slug){
        try {
            
          return await this.databases.getDocument(
            conf.dbId,
            conf.collectionId,
            slug
           )

        } catch (e) {
            console.log("Appwrite error :: getPost :: error ", e);
            return false
        }
    }

    async getPosts(){
        try {

           return await this.databases.listDocuments(
                conf.dbId,
                conf.collectionId,
                [
                    Query.equal("status" , "active")
                ]
            )
            
        } catch (e) {
            console.log("Appwrite Service :: getPosts :: Error", e);
            return false
        }
    }

    async getMyPosts(id){
        try {

           return await this.databases.listDocuments(
                conf.dbId,
                conf.collectionId,
                [
                    Query.equal("userID" , id)
                ]
            )
            
        } catch (e) {
            console.log("Appwrite Service :: getMyPosts :: Error", e);
            return false
        }
    }

    // File Services

    async uploadFile(file){
       try {
        return await this.bucket.createFile(
            conf.bucketId,
            ID.unique(),
            file
        )
        
       } catch (e) {
        console.log("Appwrite Service :: uploadFile :: Error", e);
       }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true

        } catch (e) {
            console.log("Appwrite Error :: deleteFile :: error" , e);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
    }
}


const service = new Service()

export default service