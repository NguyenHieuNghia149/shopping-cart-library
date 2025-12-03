import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Card from './Card.jsx';

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => (
  <Card className="p-4 mb-3">
    <div className="flex gap-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')} ₫</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateQuantity(item.id, item.quantity - 1);
            }}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateQuantity(item.id, item.quantity + 1);
            }}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
        <p className="font-semibold text-blue-600">
          {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
        </p>
      </div>
    </div>
  </Card>
);

export default CartItemCard;