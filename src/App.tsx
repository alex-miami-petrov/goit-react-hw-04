import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMesage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "./components/Api/api";
import "./App.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        if (data.results.length === 0) {
          toast("No more images found", { type: "info" });
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (err) {
        setError("Failed to fetch images. Please try again.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    loadImages();

    return () => {
      setLoading(false);
    };
  }, [query, page]);

  useEffect(() => {
    if (loadingMore) {
      setTimeout(() => {
        if (loadMoreRef.current) {
          loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [loadingMore]);

  const handleSearchSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div id="root">
      <Toaster />
      <header>
        <SearchBar onSubmit={handleSearchSubmit} />
      </header>
      {loading && !loadingMore && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <div className="load-more-container">
        <div ref={loadMoreRef} aria-live="polite">
          {loadingMore ? (
            <Loader />
          ) : (
            images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </div>
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
