import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img className="small" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div>{product.price}Kz</div>
      <div>
        <button onClick={() => onAdd(product)} id='btn-add-product' className="enviarPedido">Adicionar</button>
      </div>
    </div>
  );
}
