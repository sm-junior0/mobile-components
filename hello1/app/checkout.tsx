import { Text, View, ScrollView, Platform, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { router } from "expo-router";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { products, cart, placeOrder, totalCartItems } = useCart();

  const cartItemsDetailed = useMemo(() => {
    return Object.entries(cart).map(([productId, qty]) => {
      const p = products.find((pp) => pp.id === productId);
      return { 
        id: productId, 
        name: p?.name ?? productId, 
        price: p?.price ?? 0, 
        qty, 
        subtotal: (p?.price ?? 0) * qty 
      };
    });
  }, [cart, products]);

  const subtotal = useMemo(() => 
    cartItemsDetailed.reduce((sum, item) => sum + item.subtotal, 0), 
    [cartItemsDetailed]
  );

  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    const orderId = placeOrder(cartItemsDetailed, total);
    
    Alert.alert(
      "Order Placed Successfully!",
      `Your order #${orderId} has been placed successfully.\n\nOrder Total: $${total.toFixed(2)}\nItems: ${totalCartItems}\n\nYou will receive a confirmation email shortly.`,
      [
        {
          text: "View Orders",
          onPress: () => {
            router.push("/(tabs)/orders" as any);
          },
        },
        {
          text: "Continue Shopping",
          onPress: () => {
            router.push("/" as any);
          },
        },
      ]
    );
  };

  if (totalCartItems === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0B0F14", justifyContent: "center", alignItems: "center", padding: 16 }}>
        <MaterialCommunityIcons name="cart-outline" size={64} color="#6A7684" />
        <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 16 }}>
          No items to checkout
        </Text>
        <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14, marginTop: 8, textAlign: "center" }}>
          Add some products to your cart first
        </Text>
        <Pressable
          onPress={() => router.push("/" as any)}
          style={{
            backgroundColor: "#182330",
            borderColor: "#223042",
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium" }}>
            Start Shopping
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F14" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: Platform.select({ ios: 12, android: 8, default: 8 }),
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: 12, gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="credit-card-check" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Checkout
            </Text>
          </View>

          {/* Navigation Links */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={() => router.back()}
              style={{
                backgroundColor: "#241B1B",
                borderColor: "#3A2B2B",
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MaterialCommunityIcons name="arrow-left" size={16} color="#f23353" />
              <Text style={{ color: "#f23353", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                Back to Cart
              </Text>
            </Pressable>
          </View>

          {/* Order Summary */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18 }}>
              Order Summary
            </Text>
            
            <View
              style={{
                backgroundColor: "#121923",
                borderColor: "#223042",
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
              }}
            >
              {cartItemsDetailed.map((item, index) => (
                <View key={item.id}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "#93A1AE", fontSize: 12 }}>
                        ${item.price.toFixed(2)} × {item.qty}
                      </Text>
                    </View>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 14 }}>
                      ${item.subtotal.toFixed(2)}
                    </Text>
                  </View>
                  {index < cartItemsDetailed.length - 1 && (
                    <View style={{ height: 1, backgroundColor: "#223042", marginVertical: 12 }} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Shipping Address */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18 }}>
              Shipping Address
            </Text>
            <View
              style={{
                backgroundColor: "#121923",
                borderColor: "#223042",
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                John Doe
              </Text>
              <Text style={{ color: "#93A1AE", fontSize: 14, marginTop: 4 }}>
                123 Main Street{"\n"}
                Apartment 4B{"\n"}
                New York, NY 10001{"\n"}
                United States
              </Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18 }}>
              Payment Method
            </Text>
            <View
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
              <MaterialCommunityIcons name="credit-card" size={24} color="#6EB1FF" />
              <View>
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 15 }}>
                  •••• •••• •••• 1234
                </Text>
                <Text style={{ color: "#93A1AE", fontSize: 12 }}>
                  Expires 12/26
                </Text>
              </View>
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18 }}>
              Price Details
            </Text>
            <View
              style={{
                backgroundColor: "#121923",
                borderColor: "#223042",
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                gap: 12,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#93A1AE", fontSize: 14 }}>
                  Subtotal ({totalCartItems} items)
                </Text>
                <Text style={{ color: "#E6EDF3", fontSize: 14 }}>
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#93A1AE", fontSize: 14 }}>
                  Shipping
                </Text>
                <Text style={{ color: shipping === 0 ? "#4CD389" : "#E6EDF3", fontSize: 14 }}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </Text>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#93A1AE", fontSize: 14 }}>
                  Tax
                </Text>
                <Text style={{ color: "#E6EDF3", fontSize: 14 }}>
                  ${tax.toFixed(2)}
                </Text>
              </View>
              
              <View style={{ height: 1, backgroundColor: "#223042" }} />
              
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
                  Total
                </Text>
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
                  ${total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View 
        style={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: "#0B0F14", 
          borderTopColor: "#223042", 
          borderTopWidth: 1, 
          padding: 16 
        }}
      >
        <Pressable
          onPress={handlePlaceOrder}
          style={{ 
            backgroundColor: "#182330", 
            borderColor: "#223042", 
            borderWidth: 1, 
            paddingVertical: 16, 
            borderRadius: 12,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <MaterialCommunityIcons name="check-circle" size={20} color="#4CD389" />
          <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
            Place Order - ${total.toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}