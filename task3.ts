/*2. Создайте функцию для подсчета стоимости товаров в корзине. На входе функция принимает массив объектов со свойстами name, price, quantity */

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

const calculateCartTotal = (cart : CartItem [] ) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return total;
}

const cart = [
  { name: "Хлеб", price: 3, quantity: 1 },
  { name: "Молоко", price: 2, quantity: 2 },
  { name: "Яйца", price: 4, quantity: 1 }
];

console.log(`TotalCartValue = ${calculateCartTotal(cart)}`);



