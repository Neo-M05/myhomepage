import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MenuContext } from './MenuContext';

export default function AddMenuItemScreen({ navigation }) {
    const { allMenuItems, menuItems, setMenuItems, todaysSpecialMenu } = useContext(MenuContext);
    const [courseType, setCourseType] = useState('Main');
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddDish = () => {
        // Improved validation with specific error messages
        if (!dishName.trim()) {
            Alert.alert('Missing Information', 'Please enter a dish name');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Missing Information', 'Please enter a description');
            return;
        }
        if (!price.trim()) {
            Alert.alert('Missing Information', 'Please enter a price');
            return;
        }

        // Validate price format
        const priceRegex = /^(R?\d+)$/;
        if (!priceRegex.test(price)) {
            Alert.alert('Invalid Price', 'Please enter a valid price (e.g., 150 or R150)');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            name: dishName,
            description: description,
            course: courseType,
            price: price.startsWith('R') ? price : `R${price}`,
        };

        setMenuItems(prev => [...prev, newItem]);
        
        // Clear form
        setDishName('');
        setDescription('');
        setPrice('');
        
        Alert.alert('Success', 'Dish added to menu!');
    };

    const handleRemoveDish = (id) => {
        // Check if it's a today's special item or chef-added item
        const isTodaysSpecial = todaysSpecialMenu.some(item => item.id === id);
        
        if (isTodaysSpecial) {
            // For today's special items, we'll create a modified version without the deleted item
            const updatedSpecials = todaysSpecialMenu.filter(item => item.id !== id);
            
            // Since we can't directly modify todaysSpecialMenu (it's hardcoded),
            // we'll show a message that today's specials can't be deleted
            Alert.alert('Cannot Delete', 'Today\'s special items cannot be deleted as they are pre-set menu items.');
            return;
        } else {
            // For chef-added items, remove normally
            const updated = menuItems.filter(item => item.id !== id);
            setMenuItems(updated);
        }
    }

    // Filter items by selected course for display
    const filteredItems = allMenuItems.filter(item => item.course === courseType);

    return (
        <View style={styles.container}>
            {/* Image at the top */}
            <Image source={require('./assets/dining.jpg')} style={styles.image} />
            
            {/* Header */}
            <Text style={styles.header}>Add Dish</Text>

            {/* Course Selector with Radio Buttons */}
            <View style={styles.courseSelectorContainer}>
                <Text style={styles.label}>Course</Text>
                <View style={styles.courseSelector}>
                    {['Starter', 'Main', 'Dessert'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={styles.courseOption}
                            onPress={() => setCourseType(type)}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[
                                    styles.radioOuter,
                                    courseType === type && styles.radioOuterSelected
                                ]}>
                                    {courseType === type && <View style={styles.radioInner} />}
                                </View>
                                <Text style={[
                                    styles.courseText,
                                    courseType === type && styles.selectedCourseText
                                ]}>
                                    {type}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Form Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Dish Name *"
                value={dishName}
                onChangeText={setDishName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description *"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Price * (e.g., 150 or R150)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleAddDish}>
                <Text style={styles.saveText}>Save Dish</Text>
            </TouchableOpacity>

            {/* Current Menu Items List - NOW SHOWS ALL ITEMS FOR SELECTED COURSE */}
            <Text style={styles.currentMenuHeader}>
                {courseType} Items ({filteredItems.length})
            </Text>
            
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.dishItem}>
                        <View style={styles.dishInfo}>
                            <Text style={styles.dishName}>{item.name}</Text>
                            <Text style={styles.dishDetails}>{item.course} • {item.price}</Text>
                            {item.description ? (
                                <Text style={styles.dishDescription}>{item.description}</Text>
                            ) : null}
                        </View>
                        {/* Show delete button for ALL items (both today's specials and chef-added) */}
                        <TouchableOpacity 
                            onPress={() => handleRemoveDish(item.id)} 
                            style={styles.deleteButton}
                        >
                            <Image 
                                source={require('./assets/delete.png')} 
                                style={styles.binIcon}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyListText}>No {courseType.toLowerCase()} items yet.</Text>
                }
            />

            {/* Footer Navigation - CHANGED Profile to Menu */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                    <Text style={styles.navItem}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddMenuItem')}>
                    <Text style={[styles.navItem, styles.activeNavItem]}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DetailedMenu', { category: 'Starter' })}>
                    <Text style={styles.navItem}>Menu</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

// COMPLETE STYLES OBJECT - Make sure this is at the bottom of your file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b8b5b5ff',
        alignItems: 'center',
        paddingTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: 20,
        textAlign: 'center',
    },
    courseSelectorContainer: {
        width: '90%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    courseSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    courseOption: {
        flex: 1,
        marginHorizontal: 4,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioOuterSelected: {
        borderColor: '#f0c040',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f0c040',
    },
    courseText: {
        fontSize: 14,
        color: '#666',
    },
    selectedCourseText: {
        color: '#000',
        fontWeight: '600',
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#f0c040',
        padding: 14,
        borderRadius: 6,
        width: '90%',
        alignItems: 'center',
        marginBottom: 15,
    },
    saveText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    currentMenuHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '90%',
        color: '#000',
    },
    list: {
        width: '90%',
        flex: 1,
        marginBottom: 10,
    },
    dishItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 6,
    },
    dishInfo: {
        flex: 1,
    },
    dishName: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    dishDetails: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    dishDescription: {
        fontSize: 11,
        color: '#888',
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 4,
    },
    binIcon: {
        width: 20,
        height: 20,
    },
    emptyListText: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        padding: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#e0e0e0'
    },
    navItem: {
        fontSize: 14,
        color: '#666',
    },
    activeNavItem: {
        fontWeight: 'bold',
        color: '#000',
    }
});