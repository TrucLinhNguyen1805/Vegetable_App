import React, { useState, useEffect } from 'react';
import { Text, StatusBar, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../url';
import EventBus from '../EventBus';

const SetScreen = ({ navigation }: { navigation: any }) => {
    const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
    const openChangePasswordModal = () => {
        setChangePasswordVisible(true);
    };
    const closeChangePasswordModal = () => {
        setChangePasswordVisible(false);
    };
    const [isChangeInfoVisible, setChangeInfoVisible] = useState(false);
    const openChangeInfoModal = () => {
        setChangeInfoVisible(true);
    };
    const closeChangeInfoModal = () => {
        setChangeInfoVisible(false);
    };
    const [errortext, setErrortext] = useState('');
    const [user, setUser] = useState<any>([]);
    const [userName, setUserName] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const User = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value) {
                const userData = JSON.parse(value);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error reading user data:', error);
        }
    };
    useEffect(() => {
        User();
    }, []);

    const handleChangeInfoPress = () => {
        setErrortext('');
        if (!userName) {
            alert('Vui lòng điền tên');
            return;
        }

        let dataToSend = { newUsername: userName };

        fetch(BaseUrl + 'changeUsername/' + user.id, {
            method: 'PUT',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === "success") {
                    try {
                        await AsyncStorage.setItem('user', JSON.stringify(responseJson.data)).then(() => {
                            setUser(responseJson.data);
                            EventBus.emit('userChanged', responseJson.data);
                        });
                        Alert.alert(
                            'Thành công',
                            'Bạn đã cập nhật tên thành công',
                            [
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        return null;
                                    },
                                }
                            ],
                            { cancelable: false },
                        );
                    } catch (error) {
                        console.error('Error reading or writing user data:', error);
                    }
                    console.log(responseJson.data);
                } else {
                    setErrortext(responseJson.error);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleChangePassPress = () => {
        setErrortext('');
        if (!oldPass || !newPass || !confirmPass) {
            alert('Vui lòng điền đủ thông tin');
            return;
        }

        if (newPass != confirmPass) {
            alert('Mật khẩu mới không khớp');
            return;
        }

        let dataToSend = { id: user.id, oldPass: oldPass, newPass: newPass };

        fetch(BaseUrl + 'changePassword', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === "success") {
                    Alert.alert(
                        'Thành công',
                        'Bạn đã cập nhật mật khẩu thành công',
                        [
                            {
                                text: 'Confirm',
                                onPress: () => {
                                    return null;
                                },
                            }
                        ],
                        { cancelable: false },
                    );
                    console.log(responseJson.data);
                } else {
                    alert(responseJson.error);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="white" />
            <ScrollView >
                <View>
                    <TouchableOpacity style={styles.header}>
                        <View>
                            <Image source={require("../../assets/categories/sushi.png")} style={{ height: 80, width: 60, borderRadius: 25 }} />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontSize: 15, color: "black", padding: 10 }}>Hello</Text>
                            <Text style={{ fontSize: 22, fontWeight: "bold", marginLeft: 10, color: "black" }}>{user.name}</Text>
                            {/* <Text style={{ fontSize: 12, marginLeft: 10, }}>Last account activity: 9:20am, 1/11/2023 </Text> */}
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ paddingTop: 4 }}>
                        <TouchableOpacity onPress={openChangeInfoModal} >
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                                <Icon style={styles.icon} name="user" size={30} color="orange" />
                                <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                    <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>User Account</Text>
                                    <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide" // Chọn kiểu animation cho modal
                            transparent={true}
                            visible={isChangeInfoVisible}
                            onRequestClose={closeChangeInfoModal}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 380, backgroundColor: '#FFFFFF', height: 220 }}>

                                    <Text style={{ padding: 25, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'orange' }}>Change information</Text>

                                    {/* <TextInput value="hien@gmail.com" style={{ fontSize: 16, margin: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, }} /> */}
                                    <TextInput onChangeText={(UserName) => setUserName(UserName)}
                                        placeholder={user.name}
                                        style={{ fontSize: 16, margin: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, }} />
                                    {errortext != '' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {errortext}
                                        </Text>
                                    ) : null}
                                    <View style={{ margin: 15, }}>
                                        <Button title="Save" color={'orange'} onPress={() => { handleChangeInfoPress(); closeChangeInfoModal(); }} />
                                    </View>
                                    <TouchableOpacity onPress={closeChangeInfoModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                                        <Icon name="close" size={22} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <TouchableOpacity onPress={openChangePasswordModal}>
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                                <Icon style={styles.icon} name="lock" size={30} color="orange" />
                                <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                    <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Change password</Text>
                                    <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide" // Chọn kiểu animation cho modal
                            transparent={true}
                            visible={isChangePasswordVisible}
                            onRequestClose={closeChangePasswordModal}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 380, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, height: 400 }}>
                                    <Text style={{ padding: 25, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'orange' }}>Change Password</Text>
                                    <TextInput onChangeText={(OldPass) => setOldPass(OldPass)} placeholder="Old Password" style={{ fontSize: 16, margin: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, }} />
                                    <TextInput onChangeText={(NewPass) => setNewPass(NewPass)} placeholder="New Password" style={{ fontSize: 16, margin: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, }} />
                                    <TextInput onChangeText={(ConfirmPass) => setConfirmPass(ConfirmPass)} placeholder="Confirm Password" style={{ fontSize: 16, margin: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, }} />
                                    {errortext != '' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {errortext}
                                        </Text>
                                    ) : null}
                                    <View style={{ margin: 15, }}>
                                        <Button title="Save" color={'orange'} onPress={() => { handleChangePassPress(); closeChangePasswordModal(); }} />
                                    </View>
                                    <TouchableOpacity onPress={closeChangePasswordModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                                        <Icon name="close" size={22} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="bell" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Notification</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="paperclip" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Document</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                'Logout',
                                'Are you sure? You want to logout?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            return null;
                                        },
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            AsyncStorage.clear();
                                            navigation.replace('Auth');
                                        },
                                    },
                                ],
                                { cancelable: false },
                            );
                        }}>
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                                <Icon style={styles.icon} name="sign-out" size={30} color="orange" />
                                <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                    <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Logout</Text>
                                    <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 18, padding: 20, paddingLeft: 30, fontWeight: 'bold' }}>
                        Other
                    </Text>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="trash" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Delete Account</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="comments" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Help</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="file" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Terms of service</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="star" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>App Ratings & Reviews</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE' }}>
                            <Icon style={styles.icon} name="share" size={30} color="orange" />
                            <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Share</Text>
                                <Icon name="angle-right" size={35} color="orange" style={{ marginRight: 30 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: "row",
        borderWidth: 3,
        borderColor: 'orange',
        borderStyle: 'solid', // Kiểu đường viền (solid, dotted, dashed, etc.)
        borderRadius: 10,
        padding: 10,
        margin: 20
    },
    icon: {
        padding: 20,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default SetScreen;