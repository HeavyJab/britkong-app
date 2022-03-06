import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'

interface Props {
    imageUri: string,
    title: string,
    price: string,
    currency: string,
    weight: string,
    available: boolean,
    vendor: string
}

export default function Product({
    imageUri,
    title,
    price,
    currency,
    weight,
    available,
    vendor,
 }: Props
 ) {
    return (
        <View style={styles.card}>
            <View style={{flex:1, alignItems: 'center'}}>
                <Image
                    style={{ padding: 0, width: 100, height:100, aspectRatio: 1,}}
                    source={{
                        uri: imageUri
                    }}
                    resizeMode={'contain'}
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text>
            {`${price} ${currency}`}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: Dimensions.get('window').width/ 3,
        marginBottom: 30,
        padding: 10,
    },
    title: {
        fontSize: 12
    }

})
