// In production level this approach is used so that we can be sure that every variable is string to avoid any app crash


export const conf = {

    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    dbId : String(import.meta.env.VITE_DB_ID),
    collectionId: String(import.meta.env.VITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID)

}

