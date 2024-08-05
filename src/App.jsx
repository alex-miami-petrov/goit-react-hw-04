import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import api from "./components/api";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await api.get("search/photos", {
          params: {
            page: page,
            query: query,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID GSuz9ityvF_8tNnTGG9QC0qd31RnLO7SJT4XnO6OPnA`, // Замініть на ваш Access Key
          },
        });
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setError(null);
      } catch (err) {
        toast.error("Something went wrong while fetching images.");
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.urls.small} alt={image.alt_description} />
          </li>
        ))}
      </ul>
      {images.length > 0 && !loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      <Toaster />
    </div>
  );
};

export default App;
