// 0. Модифицировать функцию подсчета стоимости товаров из прошлого задания.Теперь для расчета стоимости, товары должны соответствовать хотя бы одному из условий:
// - товар в наличии
// - стоимость товаров одного вида выше 500
// Пример входных данных:
// const products = [
//     { name: 'A', price: 100, quantity: 2, inStock: true },
//     { name: 'B', price: 40, quantity: 5, inStock: false },
//     { name: 'C', price: 10, quantity: 1, inStock: true },
//     { name: 'D', price: 200, quantity: 3, inStock: false }
// ];
const cost = 500;

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

const calculateCartTotal = (cart: CartItem[]) => {
  const filteredCart = cart.filter(item => item.inStock || item.price * item.quantity > cost);
  const total = filteredCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return total;
};

const products = [
  { name: 'A', price: 100, quantity: 2, inStock: true },
  { name: 'B', price: 40, quantity: 5, inStock: false },
  { name: 'C', price: 10, quantity: 1, inStock: true },
  { name: 'D', price: 200, quantity: 3, inStock: false }
];

console.log(`TotalCartValue = ${calculateCartTotal(products)}`);
