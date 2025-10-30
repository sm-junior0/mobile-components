
import React, { useRef, useState } from "react";
import {
  Platform,
  View,
  ScrollViewProps,
  ViewStyle,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";

type CustomScrollViewProps = ScrollViewProps & {
  contentContainerStyle?: ViewStyle | ViewStyle[];
  renderHeader?: React.ReactNode;
  enableProgressBar?: boolean;
  enableBackToTop?: boolean;
  progressBarColor?: string;
  accentColor?: string;
};

export default function CustomScrollView({
  children,
  contentContainerStyle,
  style,
  renderHeader,
  enableProgressBar = true,
  enableBackToTop = true,
  progressBarColor = "#6EB1FF",
  accentColor = "#1A2840",
  ...rest
}: CustomScrollViewProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<any>(null);
  const [showFab, setShowFab] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  const onScrollHandler = (e: any) => {
    const y = e?.nativeEvent?.contentOffset?.y ?? 0;
    setShowFab(y > 180);
    scrollY.setValue(y);
    const contentSize = e?.nativeEvent?.contentSize;
    const layoutMeasurement = e?.nativeEvent?.layoutMeasurement;
    const maxScroll = Math.max((contentSize?.height ?? 0) - (layoutMeasurement?.height ?? 0), 1);
    const ratio = Math.min(Math.max(y / maxScroll, 0), 1);
    progress.setValue(ratio);
  };

  const handleBackToTop = async () => {
    try {
      await Haptics.selectionAsync();
    } catch {}
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F14" }}>
      {enableProgressBar && (
        <View
          style={{
            height: 3,
            backgroundColor: accentColor,
          }}
        >
          <Animated.View
            style={{
              height: 3,
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: progressBarColor,
            }}
          />
        </View>
      )}

      <Animated.ScrollView
        ref={(r) => {
          scrollRef.current = r;
        }}
        style={[
          {
            flex: 1,
            backgroundColor: "#0B0F14",
          },
          style,
        ]}
        contentContainerStyle={[
          {
            paddingHorizontal: 16,
            paddingTop: Platform.select({ ios: 12, android: 8, default: 8 }),
            paddingBottom: 24,
            rowGap: 12,
          },
          contentContainerStyle as any,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode={"never"}
        scrollEventThrottle={16}
        onScroll={onScrollHandler}
        {...rest}
      >
        {renderHeader}
        {children}
      </Animated.ScrollView>

      {enableBackToTop && showFab && (
        <TouchableOpacity
          onPress={handleBackToTop}
          activeOpacity={0.85}
          style={{
            position: "absolute",
            right: 16,
            bottom: 20,
            backgroundColor: "#182330",
            borderWidth: 1,
            borderColor: "#223042",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Animated.Text
              style={{
                color: "#E6EDF3",
                fontFamily: "Inter_500Medium",
              }}
            >
              Back to top
            </Animated.Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}


