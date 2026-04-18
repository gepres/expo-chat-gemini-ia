import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'


const NotImages = () => {
  return (
    <Layout 
        style={{
            alignItems: 'center',
            flexGrow: 0,
            height: 200,
            marginBottom: 50
        }}
    >
      <Layout style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E9F2',
        borderRadius: 16,
        flexGrow: 0,
        height: 200,
        marginTop: 15,
        width: 250
      }}>
        <Text category='h5' style={{textAlign: 'center', marginBottom: 10}}>No hay imágenes</Text>

        <Text category='h7' style={{textAlign: 'center'}}>Escribe una descripción para generar imágenes</Text>
      </Layout>
    </Layout>
  )
}

export default NotImages

const styles = StyleSheet.create({})