import { useEffect, useId, useState } from "react";
import { DessertContextProvider } from "./context/DessertContext";
import MenuDisplay from "./components/MenuDisplay";

function App() {
  const [allDesserts, setAllDesserts] = useState([]);
  const [cart,setCart]= useState([])

  function addToCart(id,prodNm){
    setCart((prev)=>[...prev,{prodId:id,prodName:prodNm,qty:1}])
  }

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) =>
        data.map((product) => {
          const productId = () => {
            return crypto.randomUUID();
          };
          return { ...product, id: productId() };
        })
      )
      .then(data=>setAllDesserts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

  return (
    <DessertContextProvider value={{ allDesserts, cart, addToCart }}>
      <div className="w-full h-full main bg-Rose-100">
        <MenuDisplay/>
        {/* cart component */}
      </div>
    </DessertContextProvider>
  );
}

export default App;
