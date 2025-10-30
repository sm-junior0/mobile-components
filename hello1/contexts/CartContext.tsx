import React, { createContext, useContext, useState, ReactNode } from "react";

const initialProducts = [
  { id: "p1", name: "Wireless Headphones", price: 59.99, stock: 32, category: "Audio", rating: 4.5, reviews: 128, image: "🎧", description: "Premium wireless headphones with noise cancellation" },
  { id: "p2", name: "Bluetooth Speaker", price: 39.5, stock: 18, category: "Audio", rating: 4.2, reviews: 89, image: "🔊", description: "Portable Bluetooth speaker with rich bass" },
  { id: "p3", name: "USB-C Charger", price: 14.99, stock: 120, category: "Accessories", rating: 4.7, reviews: 245, image: "🔌", description: "Fast charging USB-C adapter" },
  { id: "p4", name: "Smartwatch Band", price: 9.99, stock: 64, category: "Accessories", rating: 4.1, reviews: 67, image: "⌚", description: "Comfortable silicone smartwatch band" },
  { id: "p5", name: "Portable SSD 500GB", price: 79.0, stock: 9, category: "Storage", rating: 4.8, reviews: 156, image: "💾", description: "Ultra-fast portable SSD storage" },
  { id: "p6", name: "Gaming Mouse", price: 24.25, stock: 41, category: "Gaming", rating: 4.4, reviews: 203, image: "🖱️", description: "High-precision gaming mouse with RGB" },
  { id: "p7", name: "Mechanical Keyboard", price: 89.0, stock: 7, category: "Gaming", rating: 4.6, reviews: 178, image: "⌨️", description: "Mechanical keyboard with blue switches" },
  { id: "p8", name: "Webcam 1080p", price: 49.99, stock: 15, category: "Electronics", rating: 4.3, reviews: 92, image: "📹", description: "Full HD webcam for streaming" },
  { id: "p9", name: "Smartphone Case", price: 12.99, stock: 22, category: "Accessories", rating: 4.0, reviews: 134, image: "📱", description: "Protective smartphone case" },
  { id: "p10", name: "Wireless Mouse", price: 19.99, stock: 34, category: "Electronics", rating: 4.2, reviews: 87, image: "🖱️", description: "Ergonomic wireless mouse" },
  { id: "p11", name: "Smart TV 55-inch", price: 899.0, stock: 5, category: "Electronics", rating: 4.7, reviews: 234, image: "📺", description: "4K Smart TV with HDR support" },
  { id: "p12", name: "Wireless Earbuds", price: 49.99, stock: 28, category: "Audio", rating: 4.3, reviews: 167, image: "🎵", description: "True wireless earbuds with charging case" },
  { id: "p13", name: "External SSD 1TB", price: 129.99, stock: 17, category: "Storage", rating: 4.9, reviews: 298, image: "💿", description: "High-speed external SSD drive" },
  { id: "p14", name: "Smart Home Hub", price: 149.0, stock: 8, category: "Smart Home", rating: 4.5, reviews: 112, image: "🏠", description: "Central hub for smart home devices" },
  { id: "p15", name: "Gaming Headset", price: 59.99, stock: 20, category: "Gaming", rating: 4.4, reviews: 189, image: "🎮", description: "Professional gaming headset with mic" },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
};

export type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    subtotal: number;
  }>;
  statusColor: string;
  statusBg: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
};

type CartContextType = {
  products: Product[];
  cart: Record<string, number>;
  orders: Order[];
  wishlist: string[];
  notifications: Notification[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (orderItems: any[], total: number) => string;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  totalCartItems: number;
  unreadNotifications: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;
    
    setProducts((prev) => 
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
    );
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
    
    addNotification({
      title: "Added to Cart",
      message: `${product.name} has been added to your cart`,
      type: "success",
      read: false,
    });
  };

  const removeFromCart = (productId: string) => {
    const qty = cart[productId] ?? 0;
    if (qty <= 0) return;
    
    setProducts((prev) => 
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p))
    );
    setCart((prev) => {
      const nextQty = qty - 1;
      const next = { ...prev } as Record<string, number>;
      if (nextQty <= 0) {
        delete next[productId];
      } else {
        next[productId] = nextQty;
      }
      return next;
    });
  };

  const clearCart = () => {
    // Return all cart items back to stock
    Object.entries(cart).forEach(([productId, qty]) => {
      setProducts((prev) => 
        prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + qty } : p))
      );
    });
    setCart({});
  };

  const placeOrder = (orderItems: any[], total: number): string => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: "Processing",
      total,
      items: orderItems,
      statusColor: "#FFB366",
      statusBg: "#2A1F0F",
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Clear the cart after placing order (items are already removed from stock)
    setCart({});
    
    addNotification({
      title: "Order Placed Successfully!",
      message: `Your order ${orderId} has been placed and is being processed. Total: $${total.toFixed(2)}`,
      type: "success",
      read: false,
    });
    
    return orderId;
  };

  const addToWishlist = (productId: string) => {
    if (!wishlist.includes(productId)) {
      setWishlist(prev => [...prev, productId]);
      addNotification({
        title: "Added to Wishlist",
        message: `Product added to your wishlist`,
        type: "success",
        read: false,
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const totalCartItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <CartContext.Provider value={{
      products,
      cart,
      orders,
      wishlist,
      notifications,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      addToWishlist,
      removeFromWishlist,
      addNotification,
      markNotificationAsRead,
      totalCartItems,
      unreadNotifications,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}