import { View, Text, StyleSheet } from 'react-native';

export default function Footer(){
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 FitnessFree. Todos os direitos reservados.</Text>
        </View>    
    )
}

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    },
});