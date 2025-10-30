import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#0B0F14",
              borderRightColor: "#223042",
              borderRightWidth: 1,
            },
            drawerLabelStyle: {
              color: "#E6EDF3",
              fontFamily: "Inter_500Medium",
            },
            drawerActiveTintColor: "#6EB1FF",
            drawerInactiveTintColor: "#9FB0C1",
            headerStyle: {
              backgroundColor: "#0B0F14",
              borderBottomColor: "#223042",
              borderBottomWidth: 1,
            },
            headerTintColor: "#E6EDF3",
            headerTitleStyle: {
              fontFamily: "Inter_700Bold",
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Products",
              title: "Products",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="warehouse" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: "Shop",
              title: "Shop",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="shopping" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="checkout"
            options={{
              drawerLabel: "Checkout",
              title: "Checkout",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="credit-card-check" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              title: "My Profile",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="admin"
            options={{
              drawerLabel: "Admin Dashboard",
              title: "Admin Dashboard",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
              ),
            }}
          />
        </Drawer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
