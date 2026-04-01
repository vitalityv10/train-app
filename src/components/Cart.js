import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useAuth } from './auth/AuthContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, user } = useAuth();

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) 
    return <Container className="mt-5 text-center"><h3>Please log in to see your cart.</h3></Container>;

  return (
    <Container className="mt-5 p-4 shadow-sm bg-light rounded">
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Train #</th>
                <th>Route</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.route.join(' → ')}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end mt-4">
            <h4>Total: <span className="text-primary">${totalPrice}</span></h4>
            <Button variant="success" className="mt-2 px-5">Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
}