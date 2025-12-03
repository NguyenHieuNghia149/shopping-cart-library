import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Plus } from 'lucide-react';
import Button from './Button.jsx';
import Card from './Card.jsx';
import CartItemCard from './CartItemCard.jsx';
import ProductModal from './ProductModal.jsx';

const ShoppingCart = ({ initialItems = [] }) => {
  const [cartItems, setCartItems] = useState(initialItems.length > 0 ? initialItems : [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 28990000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592286927505-52e1cf159fc9?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'AirPods Pro',
      price: 6290000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=200&h=200&fit=crop'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(items =>
        items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleSaveProduct = (product) => {
    if (editingItem) {
      setCartItems(items =>
        items.map(item => (item.id === product.id ? product : item))
      );
    } else {
      setCartItems(items => [...items, product]);
    }
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CartIcon size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
                <p className="text-sm text-gray-600">{totalItems} sản phẩm</p>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={20} className="inline mr-2" />
              Thêm sản phẩm
            </Button>
          </div>
        </Card>

        {/* Cart Items */}
        <div className="mb-6">
          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <CartIcon size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">Giỏ hàng trống</p>
              <Button onClick={() => setIsModalOpen(true)} className="mt-4">
                Thêm sản phẩm đầu tiên
              </Button>
            </Card>
          ) : (
            cartItems.map(item => (
              <div key={item.id} onClick={() => openEditModal(item)} className="cursor-pointer">
                <CartItemCard
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <Card className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{totalAmount.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Tổng cộng</span>
                <span className="text-blue-600">{totalAmount.toLocaleString('vi-VN')} ₫</span>
              </div>
              <Button variant="success" className="w-full mt-4" size="lg">
                Thanh toán
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveProduct}
        editItem={editingItem}
      />
    </div>
  );
};

export default ShoppingCart;