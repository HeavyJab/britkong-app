import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements'

interface Props {
    collection: string
    onPress: (value:string) => void
    active: boolean
}

export default function Category({collection, onPress, active}: Props) {
    return (
          <Button 
            titleStyle={{fontSize: 12}}
            onPress={() => onPress(collection)} 
            buttonStyle={{borderRadius: 30, padding: 8, margin: 5}}
            type={active ? 'solid' : 'outline'}
            title={collection}
            /
            >
    )
}
