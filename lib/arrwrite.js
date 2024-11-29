import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.svtroya.menuplanner',
  projectId: '6741f3570015fae7409f',
  databaseId: '6741f6120016a50935cc',
  userCollectionId: '6741f64d001f605a0773',
  recipeCollectionId: '6741f6980002ca868a85'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  recipeCollectionId
} = config

const client = new Client()

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) throw Error

    const avatarURL = avatars.getInitials(username)

    await signIn(email, password)

    const userInfo = {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarURL
    }

    return await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      userInfo
    )
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function signIn(email, password) {
  try {
    return await account.createEmailPasswordSession(email, password)
  } catch (error) {
    throw new Error(error)
  }
}

export async function getCurrentUser() {
  try{
      const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  }
  catch(error){
    throw new Error(error)
  }
}

export async function getAllBaseRecipesByUser(userId) {
  try{
    const recipes = await databases.listDocuments(
      databaseId,
      recipeCollectionId,
      [Query.select(['$id', 'title', 'description', 'image']), Query.equal('user', userId)]
      )

    return recipes.documents
  }
  catch(error){
    throw new Error(error)
  }
}

export async function getFullRecipeById(recipeId) {
  try{
    return await databases.getDocument(
      databaseId,
      recipeCollectionId,
      recipeId
    )
  }
  catch(error){
    throw new Error(error)
  }
}