import { Text, View, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { useCart } from "../contexts/CartContext";

export default function Profile() {
  const { totalCartItems } = useCart();

  const profileOptions = [
    { id: 1, title: "Account Settings", icon: "account-cog", description: "Manage your account preferences" },
    { id: 2, title: "Order History", icon: "history", description: "View your past orders", route: "/(tabs)/orders" },
    { id: 3, title: "Notifications", icon: "bell", description: "Manage notification settings" },
    { id: 4, title: "Payment Methods", icon: "credit-card", description: "Manage payment options" },
    { id: 5, title: "Shipping Address", icon: "map-marker", description: "Update delivery addresses" },
    { id: 6, title: "Help & Support", icon: "help-circle", description: "Get help and contact support" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F14" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: Platform.select({ ios: 12, android: 8, default: 8 }),
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: 12, gap: 20 }}>
          {/* Profile Header */}
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#182330",
                borderColor: "#223042",
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <MaterialCommunityIcons name="account" size={40} color="#6EB1FF" />
            </View>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 20 }}>
              John Doe
            </Text>
            <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14 }}>
              john.doe@example.com
            </Text>
          </View>

          {/* Quick Navigation Buttons */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Quick Actions
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => router.push("/(tabs)/cart" as any)}
                style={{
                  flex: 1,
                  backgroundColor: "#121923",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="cart" size={24} color="#6EB1FF" />
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12, marginTop: 4 }}>
                  Cart ({totalCartItems})
                </Text>
              </Pressable>
              
              <Pressable
                onPress={() => router.push("/(tabs)/orders" as any)}
                style={{
                  flex: 1,
                  backgroundColor: "#121923",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="package-variant" size={24} color="#6EB1FF" />
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12, marginTop: 4 }}>
                  Orders
                </Text>
              </Pressable>
              
              <Pressable
                onPress={() => router.push("/" as any)}
                style={{
                  flex: 1,
                  backgroundColor: "#121923",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="warehouse" size={24} color="#6EB1FF" />
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12, marginTop: 4 }}>
                  Products
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Profile Options */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Account Settings
            </Text>
            {profileOptions.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => option.route && router.push(option.route as any)}
                style={{
                  backgroundColor: "#121923",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <MaterialCommunityIcons name={option.icon as any} size={24} color="#9FB0C1" />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                    {option.title}
                  </Text>
                  <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 }}>
                    {option.description}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#6A7684" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}