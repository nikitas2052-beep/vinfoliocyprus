import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Request an Offer",
  description:
    "Select the wines you're interested in and request a personalised offer from Vinfolio.",
};

export default function CartPage() {
  return <CartView />;
}
