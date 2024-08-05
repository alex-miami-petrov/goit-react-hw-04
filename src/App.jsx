import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn";
import ImageModal from "./ImageModal";
import { ToastContainer } from "react-hot-toast";
import api from "./api";

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
          },
        });
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setError(null);
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
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
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={modalImage}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
