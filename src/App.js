import { useState, useRef } from "react";

import axios from "axios";

import "./App.css";
import spinner from "./UI/assets/spinner.gif";

import { API_KEY } from "./store/consts";
import Search from "./UI/icons/search";
import GifList from "./components/GifList";

function App() {
  const [gif, setGif] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refInput = useRef();

  const fetchGif = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en`
      );
      const data = response.data["data"];

      setGif(data);
    } catch (error) {
      if (error.response) {
        setError(error.message);
      } else if (error.request) {
        setError(error.message);
      } else {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  const handleOnKeyPress = (e) => {
    const query = refInput.current.value;

    if (e.which === 13 && query !== "") {
      fetchGif(query);
      refInput.current.value = "";
    } else if (e.which === 13 && query === "") {
      alert("enter a something 👀");
    }
  };

  const handleSearchOnClick = (e) => {
    if (refInput.current.value !== "") {
      const query = refInput.current.value;
      fetchGif(query);
      refInput.current.value = "";
    } else {
      alert("enter a something 👀");
    }
  };

  let content = (
    <div className="content_without_items">
      <video width="342" height="456" autoPlay loop muted>
        <source
          src="https://media0.giphy.com/media/14uQ3cOFteDaU/giphy-downsized-small.mp4?cid=f32b82a552xraes8e5p1wo6oqph2k2wxwvdiyl024wvw7msf&rid=giphy-downsized-small.mp4&ct=g"
          type="video/mp4"
        />
      </video>
      <span style={{ color: "#fff" }}>
        <strong>Just enter a something and see magic</strong> 👆 🤩
      </span>
    </div>
  );

  if (isLoading) {
    content = (
      <div className="content_without_items">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }

  if (gif.length > 0 && isLoading !== true) {
    content = <GifList gifs={gif} />;
  }

  if (error) {
    content = (
      <div className="content_without_items">
        <h2 style={{ color: "#fff" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex_container">
      <div className="search_container">
        <input
          type="text"
          onKeyPress={handleOnKeyPress}
          ref={refInput}
          placeholder="Search Gif"
        />
        <div className="btn_search">
          <i style={{ cursor: "pointer" }} onClick={handleSearchOnClick}>
            <Search />
          </i>
        </div>
      </div>

      {content}
    </div>
  );
}

export default App;
