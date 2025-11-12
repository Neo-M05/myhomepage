import React, { useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView, 
    TouchableOpacity, 
    Platform 
} from 'react-native';
import { MenuContext } from './MenuContext';

export default function DetailedMenuScreen({ route, navigation }) {
    const { allMenuItems } = useContext(MenuContext);
    const { category } = route.params;

    // Filter items by selected category - NOW USING ALL ITEMS (today's specials + chef-added)
    const categoryItems = allMenuItems.filter(item => item.course === category);

    // Hard-coded descriptions for demo (you can replace with actual data)
    const getDescription = (itemName) => {
        const descriptions = {
            'Butter Garlic Prawns': 'Succulent prawns with a simple, rich sauce of melted butter, fresh garlic, and herbs.',
            'Mini Quiches': 'Delicate pastry filled with creamy egg, cheese, and fresh vegetables.',
            'Grilled Steak with Balsamic Veggies': 'Premium cut steak grilled to perfection, served with roasted vegetables in balsamic glaze.',
            'Pancakes with honey and strawberry toppings': 'Fluffy pancakes drizzled with golden honey and fresh strawberry compote.',
            'Garlic Butter Prawns': 'Juicy prawns sautéed in garlic butter with a hint of lemon.',
            'Grilledsteak': 'Premium steak grilled to perfection with herbs and spices.',
            'Oreo': 'Delicious Oreo dessert with creamy filling and chocolate cookies.',
            'Quichesmini': 'Mini quiches with delicate pastry and savory fillings.',
            'Beef Wellington': 'Tender beef fillet wrapped in puff pastry with mushroom duxelles.',
            'Chocolate Lava Cake': 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.',
            'Caprese Salad': 'Fresh mozzarella, tomatoes, and basil with balsamic reduction.'
        };
        return descriptions[itemName] || 'Delicious dish prepared with fresh ingredients.';
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('./assets/dining.jpg')} 
                        style={styles.logoImage}
                    />
                    <View>
                        <Text style={styles.headerTitle}>Christoffel</Text>
                        <Text style={styles.headerSubtitle}>Dining</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Menu Header */}
                <View style={styles.menuHeader}>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <View style={styles.categoryTabs}>
                        <TouchableOpacity 
                            style={styles.categoryTab}
                            onPress={() => navigation.setParams({ category: 'Starter' })}
                        >
                            <Text style={[
                                styles.categoryTabText, 
                                category === 'Starter' && styles.activeCategoryTabText
                            ]}>
                                Starter {allMenuItems.filter(item => item.course === 'Starter').length}
                            </Text>
                            {category === 'Starter' && <View style={styles.underline} />}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.categoryTab}
                            onPress={() => navigation.setParams({ category: 'Main' })}
                        >
                            <Text style={[
                                styles.categoryTabText, 
                                category === 'Main' && styles.activeCategoryTabText
                            ]}>
                                Main {allMenuItems.filter(item => item.course === 'Main').length}
                            </Text>
                            {category === 'Main' && <View style={styles.underline} />}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.categoryTab}
                            onPress={() => navigation.setParams({ category: 'Dessert' })}
                        >
                            <Text style={[
                                styles.categoryTabText, 
                                category === 'Dessert' && styles.activeCategoryTabText
                            ]}>
                                Desserts {allMenuItems.filter(item => item.course === 'Dessert').length}
                            </Text>
                            {category === 'Dessert' && <View style={styles.underline} />}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Menu Items List */}
                {categoryItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No {category} items available.</Text>
                        <Text style={styles.emptyStateSubtext}>Add some {category.toLowerCase()} dishes using the + button!</Text>
                    </View>
                ) : (
                    <View style={styles.menuItemsContainer}>
                        {categoryItems.map((item, index) => (
                            <View key={item.id || index} style={styles.menuItem}>
                                <Image
                                    source={item.image || require('./assets/dining.jpg')}
                                    style={styles.menuItemImage}
                                />
                                <View style={styles.menuItemDetails}>
                                    <Text style={styles.menuItemName}>{item.name}</Text>
                                    <Text style={styles.menuItemDescription}>
                                        {getDescription(item.name)}
                                    </Text>
                                    <Text style={styles.menuItemPrice}>{item.price}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                
                <View style={{height: 30}} />
            </ScrollView>

            {/* Footer Navigation - CHANGED Profile to Menu */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.iconText}>🏠</Text>
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Filter')}>
                    <Text style={styles.iconText}>⚙️</Text>
                    <Text style={styles.footerText}>Filter</Text>
                </TouchableOpacity>
               
                <TouchableOpacity 
                    style={styles.footerIcon} 
                    onPress={() => navigation.navigate('AddMenuItem')}
                >
                    <Text style={styles.iconText}>➕</Text>
                    <Text style={styles.footerText}>Add menu item</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.footerIcon}
                    onPress={() => navigation.navigate('DetailedMenu', { category: 'Starter' })}
                >
                    <Text style={styles.iconText}>📋</Text>
                    <Text style={styles.footerText}>Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 35 : 0 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'white',
        marginTop: -2,
    },
    backButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    menuHeader: {
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    categoryTabs: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryTab: {
        marginRight: 25,
        paddingVertical: 8,
    },
    categoryTabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    activeCategoryTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    underline: {
        height: 2,
        backgroundColor: '#000',
        marginTop: 4,
        borderRadius: 1,
    },
    menuItemsContainer: {
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItemImage: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginRight: 15,
    },
    menuItemDetails: {
        flex: 1,
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    menuItemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    footerIcon: {
        alignItems: 'center',
        width: 80,
    },
    footerText: {
        fontSize: 11,
        color: 'grey',
        marginTop: 2,
    },
    iconText: {
        fontSize: 20,
        color: 'grey',
        marginBottom: 2,
    },
});