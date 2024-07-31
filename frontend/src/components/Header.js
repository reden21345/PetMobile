import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
        <Text style={styles.title}>Pet Monitoring System</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4E89AE',
        height: 110,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#F3F0D7",
        fontSize: 28,
        fontWeight: "900",
        paddingTop: 50,
    },
});

export default Header;
