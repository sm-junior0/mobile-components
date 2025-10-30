import { Text, View, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { useCart } from "../contexts/CartContext";

export default function Admin() {
  const { products, orders, cart, notifications } = useCart();

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalCartItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    
    const categoryStats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalCartItems,
      topCategories,
    };
  }, [products, orders, cart]);

  const StatCard = ({ title, value, icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    subtitle?: string;
  }) => (
    <View
      style={{
        backgroundColor: "#121923",
        borderColor: "#223042",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        flex: 1,
        minWidth: 150,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
        <Text style={{ color: "#93A1AE", fontFamily: "Inter_500Medium", fontSize: 12 }}>
          {title}
        </Text>
      </View>
      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 20 }}>
        {value}
      </Text>
      {subtitle && (
        <Text style={{ color: "#6A7684", fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 2 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );

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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="view-dashboard" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Admin Dashboard
            </Text>
          </View>

          <Text style={{ color: "#93A1AE", fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" }}>
            Monitor your store performance and manage inventory.
          </Text>

          {/* Key Metrics */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Key Metrics
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ 
                paddingHorizontal: 4,
              }}
              style={{ flexGrow: 0 }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <StatCard
                  title="Total Revenue"
                  value={`$${analytics.totalRevenue.toFixed(2)}`}
                  icon="currency-usd"
                  color="#4CD389"
                  subtitle="From all orders"
                />
                <StatCard
                  title="Total Orders"
                  value={analytics.totalOrders}
                  icon="package-variant"
                  color="#6EB1FF"
                  subtitle="Completed orders"
                />
                <StatCard
                  title="Products"
                  value={analytics.totalProducts}
                  icon="warehouse"
                  color="#FFB366"
                  subtitle="In catalog"
                />
                <StatCard
                  title="Active Carts"
                  value={analytics.totalCartItems}
                  icon="cart"
                  color="#9B59B6"
                  subtitle="Items in carts"
                />
              </View>
            </ScrollView>
          </View>

          {/* Inventory Alerts */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Inventory Alerts
            </Text>
            
            <View style={{ flexDirection: "row", gap: 12 }}>
              <StatCard
                title="Low Stock"
                value={analytics.lowStockProducts}
                icon="alert-circle"
                color="#FFB366"
                subtitle="< 10 items"
              />
              <StatCard
                title="Out of Stock"
                value={analytics.outOfStockProducts}
                icon="alert"
                color="#f23353"
                subtitle="0 items"
              />
            </View>
          </View>

          {/* Top Categories */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Top Categories
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
              {analytics.topCategories.map(([category, count], index) => (
                <View key={category} style={{ 
                  flexDirection: "row", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < analytics.topCategories.length - 1 ? 1 : 0,
                  borderBottomColor: "#223042",
                }}>
                  <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 14 }}>
                    {category}
                  </Text>
                  <Text style={{ color: "#6EB1FF", fontFamily: "Inter_700Bold", fontSize: 14 }}>
                    {count} products
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Orders */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Recent Orders
            </Text>
            
            {orders.length === 0 ? (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <MaterialCommunityIcons name="package-variant-closed-remove" size={48} color="#6A7684" />
                <Text style={{ color: "#93A1AE", fontFamily: "Inter_500Medium", fontSize: 14, marginTop: 8 }}>
                  No orders yet
                </Text>
              </View>
            ) : (
              <View style={{ gap: 8 }}>
                {orders.slice(0, 5).map((order) => (
                  <View
                    key={order.id}
                    style={{
                      backgroundColor: "#121923",
                      borderColor: "#223042",
                      borderWidth: 1,
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_600SemiBold", fontSize: 14 }}>
                        {order.id}
                      </Text>
                      <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 12 }}>
                        {order.date} • {order.items.length} items
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 14 }}>
                        ${order.total.toFixed(2)}
                      </Text>
                      <View
                        style={{
                          backgroundColor: order.statusBg,
                          borderColor: order.statusColor,
                          borderWidth: 1,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 6,
                          marginTop: 2,
                        }}
                      >
                        <Text style={{ color: order.statusColor, fontFamily: "Inter_500Medium", fontSize: 10 }}>
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={{ gap: 12 }}>
            <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 16 }}>
              Quick Actions
            </Text>
            
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              <Pressable
                style={{
                  backgroundColor: "#182330",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  flex: 1,
                  minWidth: 150,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons name="plus-circle" size={24} color="#4CD389" />
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                  Add Product
                </Text>
              </Pressable>
              
              <Pressable
                style={{
                  backgroundColor: "#182330",
                  borderColor: "#223042",
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  flex: 1,
                  minWidth: 150,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons name="chart-line" size={24} color="#6EB1FF" />
                <Text style={{ color: "#E6EDF3", fontFamily: "Inter_500Medium", fontSize: 12 }}>
                  View Analytics
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}