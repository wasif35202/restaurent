import { ActionTypes, CartType, CartItemType } from "@/types/storeTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      
      addToCart(item: CartItemType) {
        const products = get().products;
        
        // Check if the product with the same id and optionTitle exists
        const existingProductIndex = products.findIndex((product) =>
          product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (existingProductIndex !== -1) {
          // Update the quantity and total price of the existing product
          const updatedProducts = products.map((product, index) =>
            index === existingProductIndex
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price, // Consider if you want to modify the price logic
                }
              : product
          );

          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          // If the product doesn't exist, add it to the cart
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromCart(item: CartItemType) {
        set((state) => {
          // Find the product to remove based on id and optionTitle
          const productToRemove = state.products.find((product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
          );

          // Filter out the product from the cart
          return {
            products: state.products.filter((product) => 
              product.id !== item.id || product.optionTitle !== item.optionTitle
            ),
            totalItems: productToRemove ? state.totalItems - productToRemove.quantity : state.totalItems,
            totalPrice: productToRemove ? state.totalPrice - productToRemove.price : state.totalPrice,
          };
        });
      },
    }),
    { name: "cart" }
  )
);
