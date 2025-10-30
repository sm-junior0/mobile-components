import { Text, View, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useCart } from "../../contexts/CartContext";

export default function Notifications() {
  const { notifications, markNotificationAsRead, unreadNotifications } = useCart();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'info': return 'information';
      case 'warning': return 'alert';
      case 'error': return 'alert-circle';
      default: return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return '#4CD389';
      case 'info': return '#6EB1FF';
      case 'warning': return '#FFB366';
      case 'error': return '#f23353';
      default: return '#9FB0C1';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
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
            <MaterialCommunityIcons name="bell" size={26} color="#6EB1FF" />
            <Text
              style={{
                color: "#E6EDF3",
                fontSize: 22,
                lineHeight: 28,
                fontFamily: "Inter_700Bold",
              }}
            >
              Notifications
            </Text>
            {unreadNotifications > 0 && (
              <View
                style={{
                  backgroundColor: "#f23353",
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 6,
                }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                  {unreadNotifications > 99 ? "99+" : unreadNotifications}
                </Text>
              </View>
            )}
          </View>

          <Text style={{ color: "#93A1AE", fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" }}>
            Stay updated with your orders and app activities.
          </Text>

          {notifications.length === 0 ? (
            <View style={{ alignItems: "center", paddingVertical: 40 }}>
              <MaterialCommunityIcons name="bell-outline" size={64} color="#6A7684" />
              <Text style={{ color: "#E6EDF3", fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 16 }}>
                No notifications yet
              </Text>
              <Text style={{ color: "#93A1AE", fontFamily: "Inter_400Regular", fontSize: 14, marginTop: 8, textAlign: "center" }}>
                We'll notify you about orders, updates, and special offers
              </Text>
            </View>
          ) : (
            <View style={{ rowGap: 8 }}>
              {notifications.map((notification) => (
                <Pressable
                  key={notification.id}
                  onPress={() => !notification.read && markNotificationAsRead(notification.id)}
                  style={{
                    backgroundColor: notification.read ? "#121923" : "#1A2840",
                    borderColor: notification.read ? "#223042" : "#6EB1FF",
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 16,
                    opacity: notification.read ? 0.8 : 1,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                    <View
                      style={{
                        backgroundColor: notification.read ? "#223042" : getNotificationColor(notification.type) + "20",
                        borderRadius: 20,
                        padding: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={getNotificationIcon(notification.type) as any}
                        size={20}
                        color={getNotificationColor(notification.type)}
                      />
                    </View>
                    
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <Text
                          style={{
                            color: "#E6EDF3",
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 14,
                            flex: 1,
                          }}
                        >
                          {notification.title}
                        </Text>
                        <Text
                          style={{
                            color: "#6A7684",
                            fontFamily: "Inter_400Regular",
                            fontSize: 11,
                            marginLeft: 8,
                          }}
                        >
                          {formatTime(notification.timestamp)}
                        </Text>
                      </View>
                      
                      <Text
                        style={{
                          color: "#9FB0C1",
                          fontFamily: "Inter_400Regular",
                          fontSize: 13,
                          lineHeight: 18,
                        }}
                      >
                        {notification.message}
                      </Text>
                      
                      {!notification.read && (
                        <View style={{ marginTop: 8 }}>
                          <View
                            style={{
                              alignSelf: "flex-start",
                              backgroundColor: "#6EB1FF",
                              borderRadius: 4,
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                            }}
                          >
                            <Text
                              style={{
                                color: "#0B0F14",
                                fontFamily: "Inter_600SemiBold",
                                fontSize: 10,
                              }}
                            >
                              NEW
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}