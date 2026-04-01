import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from './auth/AuthContext';
import { ListGroup, Button } from 'react-bootstrap';
export function WishList() {
  const { wishlist, removeFromWishlist, addToCart, user } = useAuth();

  if (!user)
    return <Container className="mt-5 text-center"><h3>Please log in to see your wishlist.</h3></Container>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">My Wishlist 🤍</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-muted">Your wishlist is empty.</p>
      ) : (
        <ListGroup>
          {wishlist.map(train => (
            <ListGroup.Item key={train.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{train.title}</strong>
                <div className="text-muted">{train.route.join(' → ')}</div>
                <div>{train.price} UAH</div>
              </div>
              <div className="d-flex gap-2">
                <Button size="sm" variant="success" onClick={() => addToCart(train)}>
                  🛒 Add to Cart
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => removeFromWishlist(train.id)}>
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}