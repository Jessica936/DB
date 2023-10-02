import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [buyerName, setName] = useState("");
  const [buyerCity, setCity] = useState("");
  // const [itemID, setItemID] = useState("");
  // const [itemName, setItemName] = useState("");

  const [buyerList, setBuyerList] = useState([]);
  // const [itemList, setItemList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const addBuyer = () => {
    Axios.post("http://localhost:3001/createBuyer", {
      buyerName: buyerName,
      buyerCity: buyerCity,

    }).then(() => {
      setBuyerList([
        ...buyerList,
        {
          buyerName: buyerName,
          buyerCity: buyerCity,
        },
      ]);
    });
  };
  // const addItem = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     itemID: itemID,
  //     itemName: itemName,

  //   }).then(() => {
  //     setItemList([
  //       ...itemList,
  //       {
  //       itemID: itemID,
  //       itemName: itemName,
  //       },
  //     ]);
  //   });
  // };


  const getBuyer = () => {
    Axios.get("http://localhost:3001/buyer").then((response) => {
      setBuyerList(response.data);
    });
  };
  // const getItem = () => {
  //   Axios.get("http://localhost:3001/Item").then((response) => {
  //     setItemList(response.data);
  //   });
  // };


  const updateBuyer = (id) => {
    const NewbuyerName = prompt("Enter new Buyer name:");
    if (NewbuyerName !== null) {
      Axios.put(`http://localhost:3001/updateBuyer/${id}`, {
        buyerName: NewbuyerName,
      }).then(() => {
        getBuyer(); // Refresh the user list
      });
    }
  };

  const deleteBuyer = (id) => {
    Axios.delete(`http://localhost:3001/deleteBuyer/${id}`).then((response) => {
      getBuyer();
    });
  };

  const searchBuyer = () => {
    Axios.get(`http://localhost:3001/searchBuyer?search=${searchQuery}`).then(
      (response) => {
        setSearchResults(response.data);
      }
    );
  };

  return (
    <div className="App">
      <div className="information">
        <label>Buyer Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>Buyer City:</label>
        <input
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />

        {/* <label>Item ID:</label>
        <select
          onChange={(event) => {
            setItemID(event.target.value);
          }}
        >
          <option value="1">NO.1</option>
          <option value="2">NO.2</option>
          <option value="3">NO.3</option>
          <option value="4">NO.4</option>
          <option value="5">NO.5</option>
          <option value="6">NO.6</option>
          <option value="7">NO.7</option>
          <option value="8">NO.8</option>
          <option value="9">NO.9</option>
          <option value="10">NO.10</option>
          <option value="11">NO.11</option>
          <option value="12">NO.12</option>
          <option value="13">NO.13</option>
          <option value="14">NO.14</option>
          <option value="15">NO.15</option>
        </select>
        <label>Item Name:</label>
        <select
          onChange={(event) => {
            setItemName(event.target.value);
          }}
        >
          <option value="Water bottle">Water bottle</option>
          <option value="Sweater">Sweater</option>
          <option value="Blouse">Blouse</option>
          <option value="Nike Court Legacy Lift">Nike Court Legacy Lift</option>
          <option value="Nike Air Force 1 Shadow">Nike Air Force 1 Shadow</option>
          <option value="Smartphone X">Smartphone X</option>
          <option value="Running Shoes">Running Shoes</option>
          <option value="Garden Hose">Garden Hose</option>
          <option value="Laptop Pro">Laptop Pro</option>
          <option value="Denim Jeans">Hybrid</option>
          <option value="4K TV">4K TV</option>
          <option value="Coffee Maker">Coffee Maker</option>
          <option value="Winter Coat">Winter Coat</option>
          <option value="Bluetooth Headphones">Bluetooth Headphones</option>
          <option value="Patio Furniture Set">Patio Furniture Set</option>
        </select> */}
        <button onClick={addBuyer}>Add Buyer</button>
        {/* <button onClick={addItem}>Add Item</button> */}
      </div>
      <div className="buyer">
        <button onClick={getBuyer}>Show Buyer</button>
        {/* <button onClick={getItem}>Show Item</button> */}

        {buyerList.map((val, key) => {
          return (
            <div className="buyer" key={key}>
              <div>
                <h3>Buyer ID: {val.buyerID}</h3>
                <h3>Buyer Name: {val.buyerName}</h3>
                <h3>Buyer City: {val.buyerCity}</h3>
                {/* <h3>Item ID: {val.itemID}</h3>
                <h3>Item Name: {val.itemName}</h3> */}
              </div>
              <div>
                {/* <select
                onChange={(event) => {
                  setItemID(event.target.value);
                }}
              >
                <option value="1">NO.1</option>
                <option value="2">NO.2</option>
                <option value="3">NO.3</option>
                <option value="4">NO.4</option>
                <option value="5">NO.5</option>
                <option value="6">NO.6</option>
                <option value="7">NO.7</option>
                <option value="8">NO.8</option>
                <option value="9">NO.9</option>
                <option value="10">NO.10</option>
                <option value="11">NO.11</option>
                <option value="12">NO.12</option>
                <option value="13">NO.13</option>
                <option value="14">NO.14</option>
                <option value="15">NO.15</option>
              </select> */}
                <button
                  onClick={() => {
                    updateBuyer(val.buyerID);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteBuyer(val.buyerID);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            
          );
        })}
      </div>
      <div className="search">
                <label>Search Buyer:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                />
                <button onClick={searchBuyer}>Search</button>
              </div>

              {/* Display search results */}
              <div className="search-results">
                {searchResults.map((result, index) => {
                  return (
                    <div className="search-result" key={index}>
                      <p>ItemID: {result.itemID}</p>
                      <p>Item Name: {result.itemName}</p>
                    </div>
                  );
                })}
              </div>
    </div>
  );
}

export default App;

