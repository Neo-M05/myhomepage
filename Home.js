import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MenuContext } from './MenuContext';

// Component for a Single Menu Item
const TodayMenuItem = ({ item }) => (
  <View style={styles.todayMenuItemContainer}>
    <Image
      source={item.image || require('./assets/dining.jpg')}  // Use existing image as fallback
      style={styles.todayMenuItemImage}
    />
    <View style={styles.todayMenuItemDetails}>
      <Text style={styles.todayMenuItemName}>{item.name}</Text>
      {item.description ? (
        <Text style={styles.todayMenuItemDescription}>{item.description}</Text>
      ) : null}
      <Text style={styles.todayMenuItemPrice}>{item.price}</Text>
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const { menuItems } = useContext(MenuContext);

  // Calculate counts dynamically from chef-added items
  const starterItems = menuItems.filter(item => item.course === 'Starter');
  const mainItems = menuItems.filter(item => item.course === 'Main');
  const dessertItems = menuItems.filter(item => item.course === 'Dessert');

  const navigateToDetailedMenu = (category) => {
    console.log(`Navigating to detailed menu for: ${category}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/dining.jpg')} 
            style={styles.logoImage}
          />
          <Text style={styles.headerTitle}>Christoffel Dining</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageHeading}>Home</Text>

        {/* Menu Tabs - DYNAMIC COUNTS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => navigateToDetailedMenu('Starter')}>
            <Text style={styles.tabText}>Starter {starterItems.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigateToDetailedMenu('Main')}>
            <Text style={styles.tabText}>Main {mainItems.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigateToDetailedMenu('Desserts')}>
            <Text style={styles.tabText}>Desserts {dessertItems.length}</Text>
          </TouchableOpacity>
        </View>
       
        {/* Summary Block */}
        <View style={styles.summaryBlock}>
          <TouchableOpacity style={styles.summaryRow} onPress={() => navigateToDetailedMenu('Starter')}>
            <Text style={styles.summaryCategoryText}>Starter</Text>
            <Text style={styles.summaryPriceText}>
              {starterItems.length > 0 ? `R${starterItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0)}` : 'R0'}
            </Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.summaryRow} onPress={() => navigateToDetailedMenu('Main')}>
            <Text style={styles.summaryCategoryText}>Main</Text>
            <Text style={styles.summaryPriceText}>
              {mainItems.length > 0 ? `R${mainItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0)}` : 'R0'}
            </Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.summaryRowLast} onPress={() => navigateToDetailedMenu('Desserts')}>
            <Text style={styles.summaryCategoryText}>Dessert</Text>
            <Text style={styles.summaryPriceText}>
              {dessertItems.length > 0 ? `R${dessertItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0)}` : 'R0'}
            </Text>
          </TouchableOpacity>
        </View>
       
        {/* Today's Menu - Shows chef-added items */}
        <Text style={styles.todaysMenuHeading}>Today's Menu ({menuItems.length} items)</Text>

        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No menu items yet.</Text>
            <Text style={styles.emptyStateSubtext}>Add your first dish using the + button below!</Text>
          </View>
        ) : (
          <View style={styles.todayMenuGrid}>
            {menuItems.map(item => (
              <TodayMenuItem key={item.id} item={item} />
            ))}
          </View>
        )}
       
        <View style={{height: 30}} />
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.iconText, {color: '#000'}]}>🏠</Text>
          <Text style={[styles.footerText, {color: '#000', fontWeight: 'bold'}]}>home</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Filter')}>
          <Text style={styles.iconText}>⚙️</Text>
          <Text style={styles.footerText}>filter</Text>
        </TouchableOpacity>
       
        <TouchableOpacity 
          style={styles.footerIcon} 
          onPress={() => navigation.navigate('AddMenuItem')}
        >
          <Text style={styles.iconText}>➕</Text>
          <Text style={styles.footerText}>Add menu item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Text style={styles.iconText}>👤</Text>
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Your existing styles...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 35 : 0 },
  iconText: { fontSize: 24, color: 'grey', marginBottom: 2 },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { 
    width: 35, 
    height: 35, 
    resizeMode: 'cover', 
    marginRight: 10, 
    borderRadius: 5 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  menuIcon: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  content: { paddingHorizontal: 20 },
  pageHeading: { fontSize: 32, fontWeight: '900', marginVertical: 15 },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { marginRight: 20, paddingVertical: 5 },
  tabText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  summaryBlock: {
    backgroundColor: '#333', borderRadius: 8, overflow: 'hidden', marginBottom: 20, marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#555',
  },
  summaryRowLast: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15,
  },
  summaryCategoryText: { fontSize: 16, color: '#fff', fontWeight: '500' },
  summaryPriceText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  todaysMenuHeading: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginTop: 15 },
  todayMenuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  todayMenuItemContainer: {
    width: '48%', backgroundColor: '#404040', borderRadius: 8, marginBottom: 15, overflow: 'hidden',
  },
  todayMenuItemImage: { 
    width: '100%', 
    height: 120, 
    resizeMode: 'cover',
    backgroundColor: '#666'
  },
  todayMenuItemDetails: { padding: 8, paddingBottom: 10 },
  todayMenuItemName: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  todayMenuItemDescription: { fontSize: 12, color: '#ccc', marginBottom: 4 },
  todayMenuItemPrice: { fontSize: 16, fontWeight: '900', color: '#FF8C00' },
  footer: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff',
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 5,
  },
  footerIcon: { alignItems: 'center', width: 80 },
  footerText: { fontSize: 11, color: 'grey', marginTop: 2 },
  emptyState: { 
    alignItems: 'center', 
    padding: 40, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 8 
  },
  emptyStateText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#666', 
    marginBottom: 8 
  },
  emptyStateSubtext: { 
    fontSize: 14, 
    color: '#999', 
    textAlign: 'center' 
  },
});