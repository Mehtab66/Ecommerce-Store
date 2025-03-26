// src/types/product.ts
export interface Product {
  id: string;            // Firestore document ID
  name: string;          // Product name
  description: string;   // Product description
  price: number;         // Price in dollars
  stock: number;         // Available stock
  category: string;      // Category (e.g., "Electronics")
  imageUrl: string;      // URL from Firebase Storage
  createdAt: number;     // Timestamp of creation
}