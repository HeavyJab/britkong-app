import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'britkong-shop.myshopify.com',
    storefrontAccessToken: "d921ab0faedf090fa71e492566bb1948"
  });

export const getAllProducts = async (): Promise<Client.Product[]> => {
    const products = await client.product.fetchAll()
    return products
}

export const getAllCollections = async (): Promise<Client.Collection[]> => {
    const collections = await client.collection.fetchAllWithProducts()
    return collections
}

export const getCollectionById = async (collectionId: string) => {
    const collection = await client.collection.fetchWithProducts(collectionId)
    return collection
}