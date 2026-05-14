import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected wines and proceed to checkout.",
};

export default function CartPage() {
  return <CartView />;
}
