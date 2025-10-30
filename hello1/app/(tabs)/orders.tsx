import { Text, View, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { useCart } from "../../contexts/CartContext";

export default function Orders() {
  const { orders } = useCart();

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
        <View style={{ paddingVertical: 12, gap: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="package-variant" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Order History
            </Text>
          </View>

          <Text style={{ color: "#93A1AE", fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" }}>
            Track your past and current orders.
          </Text>

          {/* Navigation Links */}
          <View style={{ flexDirection: "row", gap: 8, marginVertical: 8 }}>
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
                Shop More
              </Text>
            </Pressable>
            
            <Pressable
              onPress={() => router.push("/(tabs)/cart" as any)}
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
              <MaterialCommunityIcons name="cart" size={16} color="#6EB1FF" />
              <Text style={{ color: "#6EB1FF", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                View Cart
              </Text>
            </Pressable>
          </View>

          {orders.length === 0 ? (
            <View style={{ alignItems: "center", paddingVertical: 40 }}>
              <MaterialCommunityIcons name="package-variant-closed-remove" size={64} color="#6A7684" />
              <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 16 }}>
                No orders yet
              </Text>
              <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14, marginTop: 8, textAlign: "center" }}>
                Start shopping to see your orders here
              </Text>
            </View>
          ) : (
            <View style={{ rowGap: 12 }}>
              {orders.map((order) => (
                <View
                  key={order.id}
                  style={{
                    backgroundColor: "#121923",
                    borderColor: "#223042",
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
                      {order.id}
                    </Text>
                    <View
                      style={{
                        backgroundColor: order.statusBg,
                        borderColor: order.statusColor,
                        borderWidth: 1,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ color: order.statusColor, fontFamily: "Inter_500Medium", fontSize: 12 }}>
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14 }}>
                      Order Date: {order.date}
                    </Text>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14 }}>
                      {order.items.length} items
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
                      Total: ${order.total.toFixed(2)}
                    </Text>
                    <Pressable
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
                      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                        View Details
                      </Text>
                      <MaterialCommunityIcons name="chevron-right" size={16} color="#E6EDF3" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}