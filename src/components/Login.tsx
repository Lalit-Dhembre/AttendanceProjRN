import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Alert } from "react-native";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const User = useContext(UserContext);

    if (!User) {
        return <Text>User not found</Text>;
    }

    const { user, setUser } = User;

    const HandleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    };

    const HandlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', data.message);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(value) => HandleEmailChange(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={(value) => HandlePasswordChange(value)}
            />
            <Button title="Login" onPress={() => handleLogin(email, password)} />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
});
