import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MenuContext } from './MenuContext';

// Move TodayMenuItem component OUTSIDE of HomeScreen
const TodayMenuItem = ({ item }) => (
  <View style={styles.todayMenuItemContainer}>
    <Image
      source={item.image}
      style={styles.todayMenuItemImage}
    />
    <View style={styles.todayMenuItemDetails}>
      <Text style={styles.todayMenuItemName}>{item.name}</Text>
      <Text style={styles.todayMenuItemPrice}>{item.price}</Text>
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const { allMenuItems, todaysSpecialMenu } = useContext(MenuContext);

  // Calculate counts for ALL items (today's specials + chef-added)
  const starterItems = allMenuItems.filter(item => item.course === 'Starter');
  const mainItems = allMenuItems.filter(item => item.course === 'Main');
  const dessertItems = allMenuItems.filter(item => item.course === 'Dessert');

  // Calculate counts for chef-added items only (for display)
  const chefAddedItems = allMenuItems.filter(item => 
    !todaysSpecialMenu.some(special => special.id === item.id)
  );

  const totalStarters = starterItems.length;
  const totalMains = mainItems.length;
  const totalDesserts = dessertItems.length;

  const navigateToDetailedMenu = (category) => {
    navigation.navigate('DetailedMenu', { category });
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

        {/* Menu Tabs - UPDATED: Button-style tabs with ALL items count */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.tabButton} 
            onPress={() => navigateToDetailedMenu('Starter')}
          >
            <Text style={styles.tabButtonText}>Starter {totalStarters}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tabButton} 
            onPress={() => navigateToDetailedMenu('Main')}
          >
            <Text style={styles.tabButtonText}>Main {totalMains}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tabButton} 
            onPress={() => navigateToDetailedMenu('Dessert')}
          >
            <Text style={styles.tabButtonText}>Desserts {totalDesserts}</Text>
          </TouchableOpacity>
        </View>
       
       {/* Summary Block - Using ALL items prices - NOW SHOWING AVERAGE INSTEAD OF TOTAL */}
<View style={styles.summaryBlock}>
  <TouchableOpacity style={styles.summaryRow} onPress={() => navigateToDetailedMenu('Starter')}>
    <Text style={styles.summaryCategoryText}>Starter</Text>
    <Text style={styles.summaryPriceText}>
      {starterItems.length > 0 ? 
        `R${Math.round(starterItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0) / starterItems.length)}` 
        : 'R0'
      }
    </Text>
  </TouchableOpacity>
 
  <TouchableOpacity style={styles.summaryRow} onPress={() => navigateToDetailedMenu('Main')}>
    <Text style={styles.summaryCategoryText}>Main</Text>
    <Text style={styles.summaryPriceText}>
      {mainItems.length > 0 ? 
        `R${Math.round(mainItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0) / mainItems.length)}` 
        : 'R0'
      }
    </Text>
  </TouchableOpacity>
 
  <TouchableOpacity style={styles.summaryRowLast} onPress={() => navigateToDetailedMenu('Dessert')}>
    <Text style={styles.summaryCategoryText}>Dessert</Text>
    <Text style={styles.summaryPriceText}>
      {dessertItems.length > 0 ? 
        `R${Math.round(dessertItems.reduce((total, item) => total + parseInt(item.price.replace('R', '') || 0), 0) / dessertItems.length)}` 
        : 'R0'
      }
    </Text>
  </TouchableOpacity>
</View>
       
        {/* Today's Special Menu */}
        <Text style={styles.todaysMenuHeading}>Today's Special Menu ({todaysSpecialMenu.length})</Text>

        <View style={styles.todayMenuGrid}>
          {todaysSpecialMenu.map(item => (
            <TodayMenuItem key={item.id} item={item} />
          ))}
        </View>

        {/* Chef's Added Items Section */}
        <Text style={styles.chefMenuHeading}>Chef's Menu Items ({chefAddedItems.length})</Text>
        
        {chefAddedItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No chef-added items yet.</Text>
            <Text style={styles.emptyStateSubtext}>Add dishes using the + button below!</Text>
          </View>
        ) : (
          <View style={styles.todayMenuGrid}>
            {chefAddedItems.map(item => (
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
  iconText: { fontSize: 24, color: 'grey', marginBottom: 2 },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: '#4D4C4B',
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: 'white' },
  menuIcon: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  content: { paddingHorizontal: 20 },
  pageHeading: { fontSize: 32, fontWeight: '900', marginVertical: 15 },
  // UPDATED: Button-style tabs
  tabContainer: { 
    flexDirection: 'row', 
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  tabButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
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
  todaysMenuHeading: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    marginTop: 15,
    color: '#000'
  },
  chefMenuHeading: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    marginTop: 25,
    color: '#333'
  },
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
