import React from 'react';

export default function Header(props) {
  return (
    <header className="block row center">
      <div>
        <a href="#/">
          <h1 className="cart-main-title">Formulário de Pedidos</h1>
        </a>
      </div>
      <div>
        <a href="#/cart">
          Pedidos{' '}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>{' '}
      </div>
    </header>
  );
}
