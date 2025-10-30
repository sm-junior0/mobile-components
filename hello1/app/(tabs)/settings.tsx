import { Text, View, ScrollView, Platform, Pressable, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const settingsOptions = [
    { id: 1, title: "Account Settings", icon: "account-cog", description: "Manage your account" },
    { id: 2, title: "Payment Methods", icon: "credit-card", description: "Manage payment options" },
    { id: 3, title: "Shipping Address", icon: "map-marker", description: "Update delivery addresses" },
    { id: 4, title: "Privacy & Security", icon: "shield-check", description: "Privacy settings" },
    { id: 5, title: "Help & Support", icon: "help-circle", description: "Get help and support" },
    { id: 6, title: "About", icon: "information", description: "App information" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F14" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: Platform.select({ ios: 12, android: 8, default: 8 }),
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: 12, gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="cog" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Settings
            </Text>
          </View>

          {/* Quick Navigation */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={() => router.push("/" as any)}
              style={{
                backgroundColor: "#182330",
                borderColor: "#223042",
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MaterialCommunityIcons name="warehouse" size={16} color="#6EB1FF" />
              <Text style={{ color: "#6EB1FF", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                Back to Products
              </Text>
            </Pressable>
          </View>

          {/* App Preferences */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              App Preferences
            </Text>
            
            <View
              style={{
                backgroundColor: "#121923",
                borderColor: "#223042",
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                gap: 16,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <MaterialCommunityIcons name="bell" size={24} color="#9FB0C1" />
                  <View>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                      Push Notifications
                    </Text>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12 }}>
                      Receive order updates and offers
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: "#223042", true: "#6EB1FF" }}
                  thumbColor={notifications ? "#E6EDF3" : "#9FB0C1"}
                />
              </View>

              <View style={{ height: 1, backgroundColor: "#223042" }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <MaterialCommunityIcons name="theme-light-dark" size={24} color="#9FB0C1" />
                  <View>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                      Dark Mode
                    </Text>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12 }}>
                      Use dark theme
                    </Text>
                  </View>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#223042", true: "#6EB1FF" }}
                  thumbColor={darkMode ? "#E6EDF3" : "#9FB0C1"}
                />
              </View>

              <View style={{ height: 1, backgroundColor: "#223042" }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <MaterialCommunityIcons name="fingerprint" size={24} color="#9FB0C1" />
                  <View>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                      Biometric Login
                    </Text>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12 }}>
                      Use fingerprint or face ID
                    </Text>
                  </View>
                </View>
                <Switch
                  value={biometric}
                  onValueChange={setBiometric}
                  trackColor={{ false: "#223042", true: "#6EB1FF" }}
                  thumbColor={biometric ? "#E6EDF3" : "#9FB0C1"}
                />
              </View>
            </View>
          </View>

          {/* Settings Options */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Account & Support
            </Text>
            {settingsOptions.map((option) => (
              <Pressable
                key={option.id}
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

          {/* Logout Button */}
          <Pressable
            style={{
              backgroundColor: "#241B1B",
              borderColor: "#3A2B2B",
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#f23353" />
            <Text style={{ color: "#f23353", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}