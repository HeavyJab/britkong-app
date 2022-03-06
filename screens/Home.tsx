import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import Category from '../components/Category/Category'
import { getAllCollections } from '../dao/ShopifyDao'
import type { Collection, ProductVariant } from 'shopify-buy'
import useDidMountEffect from '../hooks/useDidMountEffect'
import Product from '../components/Product/Product'

export default function Home({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [collections, setCollections] = useState<Collection[] | null>(null)
  const [active, setActive] = useState<string>(null)
  const [products, setProducts] = useState<ProductVariant[] | null>(null)

  useEffect(() => {
      (async () => {
          const response: Collection[] = await getAllCollections()
          setCollections(response)
        })()
  }, [])

  useDidMountEffect(() => {
      const selectedProducts = collections!.filter(collection => {
        return collection.title === active
      })

      let allVariants
      if(selectedProducts.length !== 0) {
        allVariants = selectedProducts[0].products!.map(product => product.variants[0])
      }

      setProducts(allVariants)
  }, [active])

  return (
    <View style={styles.container}>
      <View style={{height:60}}>
        <ScrollView style={styles.categoryBar} horizontal={true}>
          {collections && collections.map((collection, idx) => 
            <Category 
              key={idx} 
              collection={collection.title}
              active={active === collection.title}
              onPress={(value) => {
                setActive(value)
              }}
            ></Category>
          )}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.productView}>
            {products && products.map(variant => 
                <Product
                    key={variant.id}
                    imageUri={variant.image.src}
                    title={variant.title}
                    price={variant.priceV2.amount}
                    currency={variant.priceV2.currencyCode}
                    weight={variant.weight}
                    available={variant.available}
                    vendor={products.vendor}
                    id={variant.id}
                /> 
            )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap'
  },
  productView: {
    flexDirection: 'row', 
    flexWrap: 'wrap',  
    width: Dimensions.get("window").width,
  },
  categoryBar: {
    flex: 1,
    padding: 10,
    width: Dimensions.get("window").width,
  }
});
