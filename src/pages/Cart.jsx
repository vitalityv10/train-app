import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useAuth } from "../components/context/auth/AuthContext";
import { useCart } from "../components/context/CartContext";
import { useTickets } from "../components/context/TicketsContext";
import CheckoutModal from "../components/checkout/CheckoutModal";
import CartTable from "../components/cart/CartTable";

export default function Cart() {
  const { user } = useAuth();
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { purchaseTickets } = useTickets();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.payment.basePrice * (item.quantity || 1),
    0,
  );

  const handleSuccess = async (tickets) => {
    await purchaseTickets(tickets);
    await clearCart();
    setShowCheckout(false);
    alert("Квитки успішно придбано!");
  };

  if (!user)
    return (
      <Container className="mt-5 text-center">
        <h3>Please log in to see your cart.</h3>
      </Container>
    );

  return (
    <Container className="mt-5 p-4 shadow-sm bg-light rounded">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <CartTable
            items={cart.items}
            onRemove={removeFromCart}
            onUpdate={updateQuantity}
          />

          <div className="text-end mt-4">
            <h4>
              Total: <span className="text-primary">{totalPrice} UAH</span>
            </h4>
            <Button
              variant="success"
              className="mt-2 px-5"
              onClick={() => setShowCheckout(true)}
            >
              Checkout
            </Button>
          </div>

          <CheckoutModal
            show={showCheckout}
            onHide={() => setShowCheckout(false)}
            cartItems={cart.items}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </Container>
  );
}
