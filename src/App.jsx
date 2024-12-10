import { useEffect, useId, useState } from "react";
import { DessertContextProvider } from "./context/DessertContext";
import MenuDisplay from "./components/MenuDisplay";
import { use } from "react";

function App() {

  const [allDesserts, setAllDesserts] = useState([]);
  const [cart,setCart]= useState([])
  const [allCartProductId, setAllCartProductId]= useState([])

  // Fetches data from data.json file 
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) =>
        // assigning unique id to each product 
        data.map((product) => {

          // function to generate new id for each product
          const productId = () => {
            return crypto.randomUUID();
          };

          return { ...product, id: productId() };
        })
      )
      .then(data=>setAllDesserts(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log("rendered");
    
  }, []);

  useEffect(()=>{
    const listofIds=cart.map((product)=>product.prodId||0)
    setAllCartProductId(listofIds)    
  },[cart])

  function addToCart(id){
    setCart((prev)=>[...prev,{prodId:id,qty:1}])
  }

  function isInCart(id){
    return allCartProductId.includes(id)
  }

  function updateQuatity(id,update){

  }

  function removeFromCart(id){

  }

  return (
    <DessertContextProvider value={{ allDesserts, cart,allCartProductId, addToCart, isInCart }}>
      <div className="relative w-full h-full main bg-Rose-100 font-Red-Hat-Text">
        <MenuDisplay/>
        {/* cart component */}
      </div>
    </DessertContextProvider>
  );
}

export default App;
