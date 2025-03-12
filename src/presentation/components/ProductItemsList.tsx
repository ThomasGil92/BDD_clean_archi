import { addToCart } from "@/application/store/cart.slice";
import { useAppDispatch } from "@/application/store/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/domain/entities/Product";

const ProductItemsList = ({ products }: { products: Product[] }) => {
  const dispatch = useAppDispatch();

  const addProduct = (productItem: Product) => {
    dispatch(addToCart(productItem));
  };

  return (
    <Card className='p-3 mb-9 text-center'>
      <h2 className='text-6xl mb-9 font-extrabold'>Products</h2>
      <ul className='grid grid-cols-4 gap-3'>
        {products.length > 0 &&
          products.map((item, id) => (
            <li
              key={item.name + id}
              className='rounded-sm text-center mb-2 p-2 bg-slate-700 items-center'
            >
              <p>
                {item.name} : {item.price}€
              </p>
              {
                <Button
                  type='button'
                  variant={"default"}
                  onClick={(e) => {
                    e.preventDefault();
                    addProduct(item);
                  }}
                >
                  Add to cart
                </Button>
              }
            </li>
          ))}
      </ul>
    </Card>
  );
};
export default ProductItemsList;
