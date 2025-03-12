import { Card } from "@/components/ui/card";
import { Cart } from "@/domain/entities/Cart"

const CartItemsList=({cart}:{cart:Cart})=>{
    return (
      <Card className='p-3 mb-9 text-center'>
        <h2 className='text-6xl font-extrabold'>Cart</h2>
        <ul className='p-3 border border-white w-4/12 mx-auto my-4'>
          {cart.items.length > 0 ? (
            cart.items.map((item, id) => (
              <li key={item.name + id}>
                {item.name} - {item.quantity} x {item.price}$ ={" "}
                {item.quantity * item.price}$
              </li>
            ))
          ) : (
            <p>No products in the cart</p>
          )}
        </ul>
        <p className='text-3xl underline underline-offset-4 font-bold'>
          Total: {cart.totalPrice}€
        </p>
      </Card>
    );
}

export default CartItemsList