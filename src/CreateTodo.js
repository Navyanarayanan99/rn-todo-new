import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const CreateTodo = () => {
    const navigation = useNavigation()
    const [todo, setTodo] = useState('')


    const submit = async () => {
        await firestore()
            .collection('todo')
            .add({
                todo: todo
            })
            .then(() => {
                navigation.navigate('AddTodo')
                Alert.alert("Success")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                editable
                multiline={true}
                numberOfLines={3}
                maxLength={40}
                value={todo}
                onChangeText={(todo) => { setTodo(todo) }}
                placeholder='Enter task'
                style={styles.input} />

            <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => submit()}
            >
                <Text style={{ color: '#fff' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateTodo

const styles = StyleSheet.create({
    input: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20
    },
    buttonSubmit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#000',
        marginTop: 20
    },

})
