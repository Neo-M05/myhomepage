import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Alert,
    Image
} from 'react-native';
import Slider from '@react-native-community/slider';
import { MenuContext } from './MenuContext';

export default function FilterScreen({ navigation }) {
    const { allMenuItems } = useContext(MenuContext);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [maxPrice, setMaxPrice] = useState(500);

    // Toggle course selection
    const toggleCourse = (course) => {
        setSelectedCourses(prev => 
            prev.includes(course) 
                ? prev.filter(item => item !== course)
                : [...prev, course]
        );
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedCourses([]);
        setMaxPrice(500);
        Alert.alert('Filters Reset', 'All filters have been cleared');
    };

    // Apply filters and navigate to results
    const applyFilters = () => {
        if (selectedCourses.length === 0) {
            Alert.alert('No Course Selected', 'Please select at least one course to filter by.');
            return;
        }

        // Filter the menu items based on selections
        let filteredItems = allMenuItems.filter(item => {
            // Filter by course
            const courseMatch = selectedCourses.includes(item.course);
            
            // Filter by price
            const itemPrice = parseInt(item.price.replace('R', '') || 0);
            const priceMatch = itemPrice <= maxPrice;
            
            return courseMatch && priceMatch;
        });

        if (filteredItems.length === 0) {
            Alert.alert(
                'No Items Found', 
                `No menu items match your filters.\nCourses: ${selectedCourses.join(', ')}\nMax Price: R${maxPrice}`
            );
            return;
        }

        // Navigate to DetailedMenu with filtered items
        const mainCategory = selectedCourses.length === 1 ? selectedCourses[0] : 'Filtered';
        
        navigation.navigate('DetailedMenu', { 
            category: mainCategory,
            filteredItems: filteredItems,
            filterInfo: {
                courses: selectedCourses,
                maxPrice: maxPrice
            }
        });
    };

    // Quick filter buttons - filter and navigate immediately
    const quickFilterByCourse = (course) => {
        const filteredItems = allMenuItems.filter(item => item.course === course);
        
        if (filteredItems.length === 0) {
            Alert.alert('No Items', `No ${course} items available.`);
            return;
        }

        navigation.navigate('DetailedMenu', { 
            category: course,
            filteredItems: filteredItems
        });
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
                <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                    <Text style={styles.resetIcon}>↻</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* Quick Filter Section */}
                <Text style={styles.sectionTitle}>Quick Filter by Course</Text>
                <View style={styles.quickFilterContainer}>
                    <TouchableOpacity 
                        style={styles.quickFilterButton}
                        onPress={() => quickFilterByCourse('Starter')}
                    >
                        <Text style={styles.quickFilterText}>Starters</Text>
                        <Text style={styles.quickFilterCount}>
                            {allMenuItems.filter(item => item.course === 'Starter').length}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.quickFilterButton}
                        onPress={() => quickFilterByCourse('Main')}
                    >
                        <Text style={styles.quickFilterText}>Mains</Text>
                        <Text style={styles.quickFilterCount}>
                            {allMenuItems.filter(item => item.course === 'Main').length}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.quickFilterButton}
                        onPress={() => quickFilterByCourse('Dessert')}
                    >
                        <Text style={styles.quickFilterText}>Desserts</Text>
                        <Text style={styles.quickFilterCount}>
                            {allMenuItems.filter(item => item.course === 'Dessert').length}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Advanced Filter Section */}
                <Text style={styles.sectionTitle}>Advanced Filter</Text>
                
                {/* Filter by Course - UPDATED TO MATCH WIREFRAME */}
                <Text style={styles.subSectionTitle}>Select Courses</Text>
                <View style={styles.courseContainerHorizontal}>
                    <TouchableOpacity 
                        style={styles.courseItemHorizontal}
                        onPress={() => toggleCourse('Starter')}
                    >
                        <View style={[
                            styles.checkboxCircle,
                            selectedCourses.includes('Starter') && styles.checkboxCircleSelected
                        ]}>
                            {selectedCourses.includes('Starter') && <View style={styles.checkmarkInner} />}
                        </View>
                        <Text style={styles.courseText}>Starter ({allMenuItems.filter(item => item.course === 'Starter').length})</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.courseItemHorizontal}
                        onPress={() => toggleCourse('Main')}
                    >
                        <View style={[
                            styles.checkboxCircle,
                            selectedCourses.includes('Main') && styles.checkboxCircleSelected
                        ]}>
                            {selectedCourses.includes('Main') && <View style={styles.checkmarkInner} />}
                        </View>
                        <Text style={styles.courseText}>Main ({allMenuItems.filter(item => item.course === 'Main').length})</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.courseItemHorizontal}
                        onPress={() => toggleCourse('Dessert')}
                    >
                        <View style={[
                            styles.checkboxCircle,
                            selectedCourses.includes('Dessert') && styles.checkboxCircleSelected
                        ]}>
                            {selectedCourses.includes('Dessert') && <View style={styles.checkmarkInner} />}
                        </View>
                        <Text style={styles.courseText}>Dessert ({allMenuItems.filter(item => item.course === 'Dessert').length})</Text>
                    </TouchableOpacity>
                </View>

                {/* Price Section - UPDATED STYLING */}
                <Text style={styles.subSectionTitle}>Maximum Price</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceValue}>R{maxPrice}</Text>
                    
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={500}
                        step={10}
                        value={maxPrice}
                        onValueChange={setMaxPrice}
                        minimumTrackTintColor="#f0c040"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#f0c040"
                    />
                    
                    <View style={styles.priceLabels}>
                        <Text style={styles.priceLabel}>R0</Text>
                        <Text style={styles.priceLabel}>R500</Text>
                    </View>
                </View>

                {/* Apply Filter Button */}
                <TouchableOpacity 
                    style={[
                        styles.applyButton, 
                        selectedCourses.length === 0 && styles.applyButtonDisabled
                    ]} 
                    onPress={applyFilters}
                    disabled={selectedCourses.length === 0}
                >
                    <Text style={styles.applyButtonText}>
                        {selectedCourses.length === 0 
                            ? 'Select Courses First' 
                            : 'Apply Filter'
                        }
                    </Text>
                </TouchableOpacity>

                <View style={{height: 30}} />
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                    <Text style={[styles.navItem, styles.activeNavItem]}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddMenuItem')}>
                    <Text style={styles.navItem}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DetailedMenu', { category: 'Starter' })}>
                    <Text style={styles.navItem}>Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    resetButton: {
        padding: 8,
    },
    resetIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
        marginTop: 10,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        marginTop: 5,
    },
    quickFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    quickFilterButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    quickFilterText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    quickFilterCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    // UPDATED: Horizontal course selection to match wireframe
    courseContainerHorizontal: {
        marginBottom: 30,
    },
    courseItemHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 8,
    },
    checkboxCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#666',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxCircleSelected: {
        borderColor: '#f0c040',
        backgroundColor: '#f0c040',
    },
    checkmarkInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
    },
    courseText: {
        fontSize: 16,
        color: '#333',
    },
    // UPDATED: Price slider styling
    priceContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#eee',
    },
    priceValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 30,
    },
    priceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    applyButton: {
        backgroundColor: '#f0c040',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    applyButtonDisabled: {
        backgroundColor: '#ccc',
    },
    applyButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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