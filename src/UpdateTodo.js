import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UpdateScreen = (props, {  route }) => {
    const navigation = useNavigation();
    const [todo, setTodo] = useState('todo')

    const { item } = props.route.params;
    const deleteUser = () => {
        if (item.id) {
            firestore()
                .collection('todo')
                .doc(item.id)
                .delete()
                .then(() => {
                    Alert.alert(
                        'Success',
                        'Deleted Successfully',
                        props.navigation.navigate('AddTodo')
                    );
                })

                .catch((error) => {
                    console.log(error)
                });
        }


    };
    const updateUser = async () => {
        if (item.id) {
            try {
                await firestore()
                    .collection('todo')
                    .doc(item.id)
                    .update({
                        todo: todo
                    })
                    .then(() => {
                        props.navigation.navigate('AddTodo')
                        Alert.alert('Updated successfully')
                    })
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <View  style={{ flex: 1 }}>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', marginBottom: 60, marginLeft: 130, height: 50, elevation: 10, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
                    style={{  width: '30%',
                    marginTop: 20,marginRight: 10 }}
                    onPress={() => navigation.navigate('AddTodo')}
                >
                    <Image source={require('./images/arrow.png')} style={{ height: 26, width: 26 }} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, fontWeight: '600', color: '#000', marginTop: 10, marginRight: 50}}>Update Todo</Text>
                <TouchableOpacity
                    style={styles.buttonSubmit}
                    onPress={() => { updateUser() }}
                >
                    <Image source={require('./images/checked.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSubmit}
                    onPress={() => { deleteUser() }}
                >
                    <Image source={require('./images/trash.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
            </View>
            
            <TextInput
                editable
                multiline={true}
                numberOfLines={3}
                defaultValue={item.todo}
                onChangeText={txt => { setTodo(txt) }}
                placeholder='Enter data' style={styles.input} />
            
        </View>
        </View>
    )
}

export default UpdateScreen

const styles = StyleSheet.create({
    input: {
        width: '90%',
        //borderWidth: 1,
        borderRadius: 10,
        //marginTop: 20,
        fontSize: 20
    },
    buttonSubmit: {
        width: '30%',
        marginTop: 20,
    },
})

