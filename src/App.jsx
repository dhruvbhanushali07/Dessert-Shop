import { useEffect, useId, useState } from "react";
import { DessertContextProvider } from "./context/DessertContext";
import MenuDisplay from "./components/MenuDisplay";
import { use } from "react";
import Cart from "./components/Cart";

function App() {
  const [tempDatabase, setTempDatabase] = useState([]);
  const [allDesserts, setAllDesserts] = useState([]);
  const [cart, setCart] = useState([]);
  let allCartProductId= cart.map((product) => product.prodId || 0)
  function generateRandomId() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
    return `${timestamp}-${randomString}`;
  }

  // Fetches data from data.json file
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) =>
        // assigning unique id to each product
        data.map((product) => {

          // function to generate new id for each product
          const productId = () => {
            return generateRandomId();
          };

          return { ...product, id: productId() };
        })
      )
      .then(data=>setAllDesserts(data))
      .catch((error) => console.error("Error fetching data:", error));
    
    
  }, []);

  function addToCart(id, nm, pri) {
    setCart((prev) => [...prev, { prodId: id, name: nm, price: pri, qty: 1 }]);
  }

  function updateQuantity(itemPos,id, update){
    let prevqty=cart[itemPos].qty
    if(prevqty==1 && !update) removeFromCart(id)
    else{
    let newqty=update? prevqty+1: prevqty-1
    console.log(newqty);
    
    setCart((prev)=>{
      return prev.map((item)=>item.prodId==id?{...item,qty:newqty}:{...item})
    });
  }
  }

  function removeFromCart(id) {
    setCart((prev) => {
      return prev.filter((item) => item.prodId != id);
    });
  }

  return (
    <DessertContextProvider
      value={{
        allDesserts,
        cart,
        allCartProductId,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      <div className="w-full m-auto header laptop:w-4/5">
        <h1 className="py-6 text-4xl font-bold header font-Red-Hat-Text">
          Desserts
        </h1>
      </div>

      <div className="box-border relative flex flex-col flex-wrap w-full h-full gap-8 laptop:content-start laptop:flex-row main laptop:justify-center font-Red-Hat-Text">
        <div className="w-full laptop:w-3/5">
          <MenuDisplay />
        </div>

        <div className="relative w-full laptop:w-1/5">
          <Cart />
        </div>
      </div>
    </DessertContextProvider>
  );
}

export default App;
