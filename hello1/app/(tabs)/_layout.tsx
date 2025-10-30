import { Tabs } from "expo-router/tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { View, Text } from "react-native";

function TabBarBadge({ count }: { count: number }) {
  if (count === 0) return null;
  
  return (
    <View
      style={{
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: '#f23353',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
      }}
    >
      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { totalCartItems, unreadNotifications } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0B0F14",
          borderTopColor: "#223042",
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          marginTop: 4,
        },
        tabBarActiveTintColor: "#6EB1FF",
        tabBarInactiveTintColor: "#9FB0C1",
        headerStyle: {
          backgroundColor: "#0B0F14",
          borderBottomColor: "#223042",
          borderBottomWidth: 1,
        },
        headerTintColor: "#E6EDF3",
        headerTitleStyle: {
          fontFamily: "Inter_700Bold",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="cart"
        options={{
          title: "Shopping Cart",
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              <MaterialCommunityIcons name="cart" size={size} color={color} />
              <TabBarBadge count={totalCartItems} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Order History",
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="package-variant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarLabel: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              <MaterialCommunityIcons name="bell" size={size} color={color} />
              <TabBarBadge count={unreadNotifications} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}