import {Account, Avatars, Client, Databases, Storage, ID, Query} from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.svtroya.menuplanner',
  projectId: '6741f3570015fae7409f',
  databaseId: '6741f6120016a50935cc',
  userCollectionId: '6741f64d001f605a0773',
  recipeCollectionId: '6741f6980002ca868a85',
  storageId: '67600ff0001c31b369e4'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  recipeCollectionId,
  storageId
} = config

const client = new Client()

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

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

async function getAllRecipesBaseInfoByUser(userId) {
  try{
    return await databases.listDocuments(
      databaseId,
      recipeCollectionId,
      [Query.select(['$id', 'title', 'description', 'image']), Query.equal('user', userId)]
    )
  }
  catch(error){
    throw new Error(error)
  }
}

export async function searchRecipesBaseInfoByUser(userId, query) {
  try{
    const recipes = query.trim() === '' ? await getAllRecipesBaseInfoByUser(userId) : await databases.listDocuments(
      databaseId,
      recipeCollectionId,
      [
        Query.select(['$id', 'title', 'description', 'image']),
        Query.equal('user', userId),
        Query.search('title', query)]
    )

    return recipes.documents
  }
  catch(error){
    throw new Error(error)
  }
}

export async function getBaseRecipeInfo(recipeId) {
  try{
    return await databases.getDocument(
      databaseId,
      recipeCollectionId,
      recipeId,
      [Query.select(['title', 'description', 'image'])]
    )
  }
  catch(error){
    throw new Error(error)
  }
}

export async function getIngredientsList(recipeId) {
  try{
    return await databases.getDocument(
      databaseId,
      recipeCollectionId,
      recipeId,
      [Query.select(['ingredients'])]
    )
  }
  catch(error){
    throw new Error(error)
  }
}

export async function getInstructionsList(recipeId) {
  try{
    return await databases.getDocument(
      databaseId,
      recipeCollectionId,
      recipeId,
      [Query.select(['steps'])]
    )
  }
  catch(error){
    throw new Error(error)
  }
}

async function getFileView(fileId) {
try {
  const fileUrl = storage.getFileView(storageId, fileId)
  if (!fileUrl) throw Error

  return fileUrl
}
  catch(error) {
  throw new Error(error)
  }
}

async function uploadFile(file) {
  if (!file) return

  const fileName = file.uri.substring(file.uri.lastIndexOf('/')+1)
  const asset = {
    name: fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri
  }

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )

    return await getFileView(uploadedFile.$id)
  }
  catch (error) {
    throw new Error(error)
  }
}

export async function addRecipe(recipe) {
  try {
    const imageUrl = await uploadFile(recipe.image)

    return await databases.createDocument(
      databaseId,
      recipeCollectionId,
      ID.unique(),
      {...recipe, image: imageUrl,}
    )
  }
  catch (error) {
    throw new Error(error)
  }
}

export async function removeRecipeById(recipeId) {
  try{
    const file = await databases.getDocument(databaseId, recipeCollectionId, recipeId, [Query.select(['image'])])
    const fileId = getImageIdFromURL(file.image)
    if (!fileId) throw Error
    await storage.deleteFile(storageId, fileId)
    await databases.deleteDocument(databaseId, recipeCollectionId, recipeId)
  }
  catch(error){
    throw new Error(error)
  }
}
 function getImageIdFromURL(imageURL) {
   const start = 'files/'
   const end = '/view'
   return imageURL.slice(imageURL.indexOf(start) + start.length, imageURL.indexOf(end))
}