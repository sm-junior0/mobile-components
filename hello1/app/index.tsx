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
import { useCart } from "../contexts/CartContext";
import { router } from "expo-router";

export default function Index() {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    addToWishlist,
    wishlist,
    totalCartItems,
  } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, query, selectedCategory, sortBy]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialCommunityIcons key={i} name="star" size={12} color="#FFD700" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <MaterialCommunityIcons
          key="half"
          name="star-half-full"
          size={12}
          color="#FFD700"
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          size={12}
          color="#6A7684"
        />
      );
    }
    return stars;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F14" }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#0B0F14" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: Platform.select({ ios: 12, android: 8, default: 8 }),
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        overScrollMode={"never"}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            paddingVertical: 12,
            gap: 14,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons
              name="warehouse"
              size={26}
              color="#6EB1FF"
            />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Products in stock
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
            Browse the available inventory.
          </Text>

          {/* Quick Navigation */}
          <View style={{ flexDirection: "row", gap: 8, marginVertical: 8 }}>
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
              <Text
                style={{
                  color: "#6EB1FF",
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                }}
              >
                View Cart ({totalCartItems})
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
                Orders
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/profile" as any)}
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
                name="account"
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
                Profile
              </Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "#0E1622",
              borderColor: "#223042",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MaterialCommunityIcons name="magnify" size={20} color="#6A7684" />
            <TextInput
              placeholder="Search products, categories..."
              placeholderTextColor="#6A7684"
              value={query}
              onChangeText={setQuery}
              style={{
                color: "#E6EDF3",
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                flex: 1,
              }}
            />
          </View>

          {/* Categories Filter */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 4,
                paddingVertical: 4,
              }}
              style={{ flexGrow: 0 }}
            >
              {categories.map((category, index) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? "#6EB1FF" : "#182330",
                    borderColor:
                      selectedCategory === category ? "#6EB1FF" : "#223042",
                    borderWidth: 1,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: index < categories.length - 1 ? 8 : 0,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedCategory === category ? "#0B0F14" : "#E6EDF3",
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                    }}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Sort Options */}
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text
              style={{
                color: "#93A1AE",
                fontFamily: "Inter_500Medium",
                fontSize: 12,
              }}
            >
              Sort by:
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 4,
              }}
              style={{ flexGrow: 0 }}
            >
              {[
                { key: "name", label: "Name" },
                { key: "price-low", label: "Price ↑" },
                { key: "price-high", label: "Price ↓" },
                { key: "rating", label: "Rating" },
                { key: "reviews", label: "Reviews" },
              ].map((sort, index) => (
                <Pressable
                  key={sort.key}
                  onPress={() => setSortBy(sort.key)}
                  style={{
                    backgroundColor:
                      sortBy === sort.key ? "#2A1F0F" : "#121923",
                    borderColor: sortBy === sort.key ? "#4A3A1F" : "#223042",
                    borderWidth: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginRight: index < 4 ? 8 : 0,
                  }}
                >
                  <Text
                    style={{
                      color: sortBy === sort.key ? "#FFB366" : "#9FB0C1",
                      fontFamily: "Inter_500Medium",
                      fontSize: 11,
                    }}
                  >
                    {sort.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Results Count */}
          <Text
            style={{
              color: "#93A1AE",
              fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            {filteredProducts.length} products found
          </Text>

          <View style={{ rowGap: 16 }}>
            {filteredProducts.map((p) => (
              <View
                key={p.id}
                style={{
                  backgroundColor: "#121923",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                {/* Product Header */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 32 }}>{p.image}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "#E6EDF3",
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 16,
                        }}
                        numberOfLines={1}
                      >
                        {p.name}
                      </Text>
                      <Text
                        style={{
                          color: "#93A1AE",
                          fontFamily: "Inter_400Regular",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        {p.category}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => addToWishlist(p.id)}
                    style={{ padding: 4 }}
                  >
                    <MaterialCommunityIcons
                      name={wishlist.includes(p.id) ? "heart" : "heart-outline"}
                      size={20}
                      color={wishlist.includes(p.id) ? "#f23353" : "#9FB0C1"}
                    />
                  </Pressable>
                </View>

                {/* Description */}
                <Text
                  style={{
                    color: "#9FB0C1",
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  {p.description}
                </Text>

                {/* Rating and Reviews */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {renderStars(p.rating)}
                  </View>
                  <Text
                    style={{
                      color: "#FFD700",
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 12,
                    }}
                  >
                    {p.rating}
                  </Text>
                  <Text
                    style={{
                      color: "#93A1AE",
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                    }}
                  >
                    ({p.reviews} reviews)
                  </Text>
                </View>

                {/* Price and Stock */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "#E6EDF3",
                      fontFamily: "Inter_700Bold",
                      fontSize: 20,
                    }}
                  >
                    ${p.price.toFixed(2)}
                  </Text>
                  <View
                    style={{
                      backgroundColor:
                        p.stock > 10
                          ? "#10331F"
                          : p.stock > 0
                          ? "#2A1F0F"
                          : "#241B1B",
                      borderColor:
                        p.stock > 10
                          ? "#1E6E3A"
                          : p.stock > 0
                          ? "#4A3A1F"
                          : "#3A2B2B",
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          p.stock > 10
                            ? "#4CD389"
                            : p.stock > 0
                            ? "#FFB366"
                            : "#f23353",
                        fontFamily: "Inter_500Medium",
                        fontSize: 11,
                      }}
                    >
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                      {cart[p.id] ? ` • ${cart[p.id]} in cart` : ""}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Pressable
                    onPress={() => removeFromCart(p.id)}
                    disabled={(cart[p.id] ?? 0) <= 0}
                    style={{
                      opacity: (cart[p.id] ?? 0) <= 0 ? 0.4 : 1,
                      flex: 1,
                      backgroundColor: "#241B1B",
                      borderColor: "#3A2B2B",
                      borderWidth: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#f23353",
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                      }}
                    >
                      Remove
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => addToCart(p.id)}
                    disabled={p.stock <= 0}
                    style={{
                      opacity: p.stock <= 0 ? 0.4 : 1,
                      flex: 2,
                      backgroundColor: "#182330",
                      borderColor: "#223042",
                      borderWidth: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cart-plus"
                      size={16}
                      color="#E6EDF3"
                    />
                    <Text
                      style={{
                        color: "#E6EDF3",
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                      }}
                    >
                      {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {totalCartItems > 0 && (
        <Pressable
          onPress={() => router.push("/(tabs)/cart" as any)}
          style={{
            position: "absolute",
            right: 16,
            bottom: 20,
            backgroundColor: "#6EB1FF",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 25,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            shadowColor: "#6EB1FF",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <MaterialCommunityIcons name="cart" size={20} color="#0B0F14" />
          <Text
            style={{
              color: "#0B0F14",
              fontFamily: "Inter_700Bold",
              fontSize: 14,
            }}
          >
            {totalCartItems}
          </Text>
          <Text
            style={{
              color: "#0B0F14",
              fontFamily: "Inter_500Medium",
              fontSize: 12,
            }}
          >
            View Cart
          </Text>
        </Pressable>
      )}
    </View>
  );
}
