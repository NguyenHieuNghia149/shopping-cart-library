import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';

const ProductModal = ({ isOpen, onClose, onSave, editItem = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: 1,
    image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ name: '', price: '', quantity: 1, image: '' });
    }
    setErrors({});
  }, [editItem, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Giá phải lớn hơn 0';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Số lượng phải lớn hơn 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        ...formData,
        id: editItem?.id || Date.now(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editItem ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit}>
            {editItem ? 'Cập nhật' : 'Thêm'}
          </Button>
        </div>
      }
    >
      <Input
        label="Tên sản phẩm"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        placeholder="Nhập tên sản phẩm"
      />
      <Input
        label="Giá (₫)"
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        error={errors.price}
        placeholder="0"
      />
      <Input
        label="Số lượng"
        type="number"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        error={errors.quantity}
        placeholder="1"
      />
      <Input
        label="URL hình ảnh"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="https://example.com/image.jpg"
      />
    </Modal>
  );
};

export default ProductModal;