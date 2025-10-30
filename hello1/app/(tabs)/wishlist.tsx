import { Text, View, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { router } from "expo-router";
import { useCart } from "../../contexts/CartContext";

export default function Wishlist() {
  const { products, wishlist, removeFromWishlist, addToCart, cart } = useCart();
  
  const wishlistItems = useMemo(() => {
    return wishlist.map(productId => {
      const product = products.find(p => p.id === productId);
      return product;
    }).filter(Boolean);
  }, [wishlist, products]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MaterialCommunityIcons key={i} name="star" size={12} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<MaterialCommunityIcons key="half" name="star-half-full" size={12} color="#FFD700" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MaterialCommunityIcons key={`empty-${i}`} name="star-outline" size={12} color="#6A7684" />);
    }
    return stars;
  };

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
            <MaterialCommunityIcons name="heart" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              My Wishlist
            </Text>
          </View>

          <Text style={{ color: "#93A1AE", fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" }}>
            Items you've saved for later.
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
                Browse Products
              </Text>
            </Pressable>
          </View>

          {wishlistItems.length === 0 ? (
            <View style={{ alignItems: "center", paddingVertical: 40 }}>
              <MaterialCommunityIcons name="heart-outline" size={64} color="#6A7684" />
              <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 16 }}>
                Your wishlist is empty
              </Text>
              <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14, marginTop: 8, textAlign: "center" }}>
                Start browsing and save items you love
              </Text>
            </View>
          ) : (
            <View style={{ rowGap: 16 }}>
              {wishlistItems.map((item) => (
                <View
                  key={item?.id}
                  style={{
                    backgroundColor: "#121923",
                    borderColor: "#223042",
                    borderWidth: 1,
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  {/* Product Header */}
                  <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <Text style={{ fontSize: 32 }}>{item?.image}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
                        {item?.name}
                      </Text>
                      <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 }}>
                        {item?.category}
                      </Text>
                      <Text style={{ color: "#9FB0C1", fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 4 }}>
                        {item?.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: item && item.stock > 0 ? "#10331F" : "#2A1F0F",
                        borderColor: item && item.stock > 0 ? "#1E6E3A" : "#4A3A1F",
                        borderWidth: 1,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ 
                        color: item && item.stock > 0 ? "#4CD389" : "#FFB366", 
                        fontFamily: "Inter_500Medium", 
                        fontSize: 11 
                      }}>
                        {item && item.stock > 0 ? `${item.stock} in stock` : "Out of Stock"}
                      </Text>
                    </View>
                  </View>

                  {/* Rating */}
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      {item && renderStars(item.rating)}
                    </View>
                    <Text style={{ color: "#FFD700", fontFamily: "Inter_600SemiBold", fontSize: 12 }}>
                      {item?.rating}
                    </Text>
                    <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12 }}>
                      ({item?.reviews} reviews)
                    </Text>
                  </View>

                  {/* Price and Actions */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18 }}>
                      ${item?.price.toFixed(2)}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Pressable
                        onPress={() => item && removeFromWishlist(item.id)}
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
                        <MaterialCommunityIcons name="heart-remove" size={16} color="#f23353" />
                        <Text style={{ color: "#f23353", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                          Remove
                        </Text>
                      </Pressable>
                      
                      {item && item.stock > 0 && (
                        <Pressable
                          onPress={() => addToCart(item.id)}
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
                          <MaterialCommunityIcons name="cart-plus" size={16} color="#E6EDF3" />
                          <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                            {cart[item.id] ? `In Cart (${cart[item.id]})` : "Add to Cart"}
                          </Text>
                        </Pressable>
                      )}
                    </View>
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