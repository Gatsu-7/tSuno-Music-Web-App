import "./App.css";
import { useState } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTracks = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://v1.nocodeapi.com/gatsu/spotify/ipxzBtWELHsyXKjF/search?q=${searchTerm}&type=track`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let convertedData = await response.json();
      if (convertedData.tracks) {
        setTracks(convertedData.tracks.items);
      } else {
        console.error("No tracks found in the response", convertedData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   getTracks();
  // }, []);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            tSuno-Music
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse deflex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={getTracks}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <>
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              {/* <div
                className="spinner-grow"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div> */}
            </>
          </div>
        </div>
        <div className="row">
          {tracks.map((el) => {
            return (
              <div key={el.id} className="col-lg-3 col-md-6 py-2">
                {/* <img src={el.album.images[1].url} alt={el.name} /> */}
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={el.album.images[1].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">
                      <h4>Artist: {el.album.artists[0].name}</h4>
                      <h6>Release Date: {el.album.release_date}</h6>
                    </p>
                    <audio
                      src={el.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>

                {/* <p>{el.name}</p>
                <p>{el.artists.map((artist) => artist.name).join(", ")}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
