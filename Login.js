import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login button pressed');
        console.log('Email:', email);
        console.log('Password:', password);

        // check if email and password match
        if (email === 'neo@gmail.com' && password === 'neo@motise') {
            console.log('Login successful, navigating to Home');
            navigation.navigate('Home'); // Capital H
        } else {
            console.log('Login failed');
            Alert.alert('Login failed', 'Incorrect email or password');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo at top center */}
            <View style={styles.diningContainer}>
                <Image 
                    source={require('./assets/dining.jpg')} 
                    style={styles.dining}
                    resizeMode="contain"
                />
            </View>

            {/* Login Form in the middle */}
            <View style={styles.formContainer}>
                <Text style={styles.loginTitle}>Log In</Text>
                
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>

            {/* Sign up section at bottom */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}> {/* Capital S */}
                    <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    diningContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    dining: {
        width: 200,
        height: 200,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 100,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#FFD700',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 40,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    signupText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
    signupLink: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});