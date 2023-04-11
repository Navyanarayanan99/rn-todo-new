import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const AddItem = ({ navigation }) => {

    let [listData, setListData] = useState([]);
    let [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    async function getUser() {
        await firestore()
            .collection('todo')
            .onSnapshot((querySnapshot) => {
                let temp = [];
                console.log('Total users: ', querySnapshot.size);
                querySnapshot.forEach((documentSnapshot) => {
                    console.log('user Id: ', documentSnapshot.id);
                    let userDetails = {};
                    userDetails = documentSnapshot.data();
                    userDetails['id'] = documentSnapshot.id;
                    temp.push(userDetails);
                    setListData(temp);
                });
            });
    }

    useEffect(() => {
        getUser()
    }, []);


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
    };
    const filteredData = listData.filter(item => {
        if (item && item.todo) {
            return item.todo.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
            return false;
        }
    });
    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                round
                searchIcon={{ size: 24, }}       
                placeholder="Search Here..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredData}
                refreshing={loading}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={styles.userCard} key={index} >

                                <Text style={styles.userCardText}>{item.todo}</Text>
                                <TouchableOpacity zonPress={() => navigation.navigate('UpdateTodo', { item })}>
                                    <Image source={require('./images/draw.png')} style={{ height: 25, width: 25, marginRight: 20 }} />
                                </TouchableOpacity>


                            </View>
                        </View>
                    )
                }}
            />
            <View>
                <TouchableOpacity style={{ marginBottom: 30, marginLeft: 330 }}

                    onPress={() => navigation.navigate('CreateTodo')}>
                    <Image source={require('./images/plus.png')} style={{ height: 50, width: 50 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddItem

const styles = StyleSheet.create({
    userCard: {
        width: 120 * 3,
        height: 60,
        //backgroundColor: "#000",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        margin: 10,
        borderWidth: 0.5

    },
    userCardText: {
        color: "#000",
        fontSize: 16,
        marginLeft: 30

    },
})
