import {
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { router } from "expo-router";

export default function Cart() {
  const { products, cart, removeFromCart, clearCart, totalCartItems } =
    useCart();
  const [query, setQuery] = useState("");

  const cartItemsDetailed = useMemo(() => {
    return Object.entries(cart).map(([productId, qty]) => {
      const p = products.find((pp) => pp.id === productId);
      return {
        id: productId,
        name: p?.name ?? productId,
        price: p?.price ?? 0,
        qty,
        subtotal: (p?.price ?? 0) * qty,
      };
    });
  }, [cart, products]);

  const cartTotal = useMemo(
    () => cartItemsDetailed.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItemsDetailed]
  );

  const filteredCartItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cartItemsDetailed;
    return cartItemsDetailed.filter((i) => i.name.toLowerCase().includes(q));
  }, [cartItemsDetailed, query]);

  const handleCheckout = () => {
    router.push("/checkout" as any);
  };

  if (totalCartItems === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0B0F14",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <MaterialCommunityIcons name="cart-outline" size={64} color="#6A7684" />
        <Text
          style={{
            color: "#E6EDF3",
            fontFamily: "Inter_700Bold",
            fontSize: 18,
            marginTop: 16,
          }}
        >
          Your cart is empty
        </Text>
        <Text
          style={{
            color: "#93A1AE",
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Add some products from the Products page to get started
        </Text>
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
          paddingBottom: 180,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: 12, gap: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="cart" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Shopping Cart ({totalCartItems} items)
            </Text>
          </View>

          <Text
            style={{
              color: "#93A1AE",
              fontSize: 14,
              lineHeight: 20,
              fontFamily: "Inter_400Regular",
            }}
          >
            Review your selected items before checkout.
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
              <MaterialCommunityIcons
                name="warehouse"
                size={16}
                color="#6EB1FF"
              />
              <Text
                style={{
                  color: "#6EB1FF",
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                }}
              >
                Continue Shopping
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)/orders" as any)}
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
              <MaterialCommunityIcons
                name="package-variant"
                size={16}
                color="#6EB1FF"
              />
              <Text
                style={{
                  color: "#6EB1FF",
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                }}
              >
                Order History
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: "#0E1622",
              borderColor: "#223042",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <TextInput
              placeholder="Search in cart"
              placeholderTextColor="#6A7684"
              value={query}
              onChangeText={setQuery}
              style={{
                color: "#E6EDF3",
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
            />
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingVertical: 6,
                paddingHorizontal: 4,
              }}
              style={{ flexGrow: 0 }}
            >
              {filteredCartItems.map((item, index) => (
                <View
                  key={`chip-${item.id}`}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "#121923",
                    borderColor: "#223042",
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginRight: index < filteredCartItems.length - 1 ? 8 : 0,
                  }}
                >
                  <MaterialCommunityIcons
                    name="package-variant-closed"
                    size={16}
                    color="#9FB0C1"
                  />
                  <Text style={{ color: "#E6EDF3" }} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={{ color: "#93A1AE" }}>x{item.qty}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{ rowGap: 12 }}>
            {filteredCartItems.map((item) => (
              <View
                key={item.id}
                style={{
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 14,
                  backgroundColor: "#121923",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      flex: 1,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="package-variant-closed"
                      size={18}
                      color="#9FB0C1"
                    />
                    <Text
                      style={{
                        color: "#E6EDF3",
                        fontFamily: "Inter_500Medium",
                        fontSize: 15,
                      }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#E6EDF3",
                      fontFamily: "Inter_700Bold",
                      fontSize: 16,
                    }}
                  >
                    x{item.qty}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ color: "#93A1AE", fontSize: 12 }}>
                      ${item.price.toFixed(2)} each
                    </Text>
                    <Text
                      style={{
                        color: "#E6EDF3",
                        fontFamily: "Inter_700Bold",
                        fontSize: 14,
                      }}
                    >
                      Subtotal: ${item.subtotal.toFixed(2)}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: "#241B1B",
                      borderColor: "#3A2B2B",
                      borderWidth: 1,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#f23353",
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                      }}
                    >
                      Remove one
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0B0F14",
          borderTopColor: "#223042",
          borderTopWidth: 1,
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#E6EDF3",
              fontFamily: "Inter_700Bold",
              fontSize: 18,
            }}
          >
            Total: ${cartTotal.toFixed(2)}
          </Text>
          <Text
            style={{
              color: "#93A1AE",
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          >
            {totalCartItems} items
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={() => clearCart()}
            style={{
              flex: 1,
              backgroundColor: "#241B1B",
              borderColor: "#3A2B2B",
              borderWidth: 1,
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#f23353",
                fontFamily: "Inter_500Medium",
                fontSize: 14,
              }}
            >
              Clear Cart
            </Text>
          </Pressable>

          <Pressable
            onPress={handleCheckout}
            style={{
              flex: 2,
              backgroundColor: "#182330",
              borderColor: "#223042",
              borderWidth: 1,
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#E6EDF3",
                fontFamily: "Inter_500Medium",
                fontSize: 14,
              }}
            >
              Checkout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
