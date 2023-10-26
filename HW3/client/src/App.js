import "./App.css";
import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState(""); 

  // useEffect(() => {
  //   getBuyerList();
  // }, []);

  const getBuyer = () => {
    Axios.get("http://localhost:3001/buyer").then((response) => {
      setBuyerList(response.data);
    });
  };

  const addBuyer = () => {
    Axios.post("http://localhost:3001/createBuyer", {
      buyerName: buyerName,
      buyerCity: buyerCity,

    }).then(() => {
        getBuyer(); // Refresh the user list
      })
  };

  // Assuming you've already imported Axios somewhere in your code

  const updateBuyer = (id) => {
    console.log("Updating buyer with id:", id);
  
    const newBuyerName = prompt("Enter new Buyer name:");
    if (newBuyerName !== null) {
      Axios.put(`http://localhost:3001/updateBuyer/${id}`, {
        buyerName: newBuyerName,
      })
        .then(() => {
          getBuyer(); // Refresh the user list
        })
        .catch((error) => {
          console.error("Error updating buyer:", error);
        });
    }
  };
  


  const deleteBuyer = (id) => {
    Axios.delete(`http://localhost:3001/deleteBuyer/${id}`).then((response) => {
      getBuyer();
    });
  };

  const searchBuyerByName = () => {
    Axios.get(`http://localhost:3001/searchBuyerByName?name=${searchQuery}`)
      .then((response) => {
        if (response.data.length === 0) {
          setErrorMessage("No buyer found with the specified name");
        } else {
          setErrorMessage(""); // Clear any previous error message
          setSearchResults(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while searching for buyers");
        setSearchResults([]); // Clear search results in case of an error
      });
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
      {/* <div className="search">
                <label>Search Buyer:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                />
                <button onClick={searchBuyer}>Search</button>
              </div> */}

              {/* Display search results */}
              {/* <div className="search-results">
                {searchResults.map((result, index) => {
                  return (
                    <div className="search-result" key={index}>
                      <p>ItemID: {result.itemID}</p>
                      <p>Item Name: {result.itemName}</p>
                    </div>
                  );
                })}
              </div> */}
      <div className="buyer">
        <button onClick={getBuyer}>Show Buyer</button>
        {/* <button onClick={getItem}>Show Item</button> */}

        {buyerList.map((val, key) => {
          return (
            <div className="buyer" key={key}>
              <div>
                <h3>Buyer ID: {val._id}</h3>
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
                    updateBuyer(val._id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteBuyer(val._id);
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
        <h2>Search Buyers</h2>
        <label>Buyer Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button onClick={searchBuyerByName}>Search</button>
      </div>

      <div className="search-results">
        <h2>Search Results</h2>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          searchResults.map((result, index) => (
            <div className="search-result" key={index}>
              <p>ID: {result._id}</p>
              <p>Buyer Name: {result.buyerName}</p>
              <p>Buyer City: {result.buyerCity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;