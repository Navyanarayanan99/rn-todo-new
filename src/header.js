import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
       <View style={styles.header}>
                    <View style={{ height: 40, width: 40, borderRadius: 10, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./images/pencil.png')} style={styles.icons} />
                    </View>
                    <View style={{ height: 40, width: 40, borderRadius: 10, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginLeft: 210 }}>
                        <Image source={require('./images/trash.png')} style={styles.icons} />
                    </View>
                </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingLeft: 20,
        justifyContent: 'space-between'
    },
    icons: {
        height: 20,
        width: 20
    },
})