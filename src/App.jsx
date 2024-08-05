// import React, { useState, useEffect } from "react";
// import SearchBar from "./components/SearchBar";
// import ImageGallery from "./components/ImageGallery";
// import Loader from "./components/Loader";
// import ErrorMessage from "./components/ErrorMessage";
// import LoadMoreBtn from "./components/LoadMoreBtn";
// import ImageModal from "./components/ImageModal";
// import toast, { Toaster } from "react-hot-toast";
// import { fetchImages } from "./components/api";
// import "./App.css";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     if (!query) return;

//     const loadImages = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await fetchImages(query, page);
//         if (data.results.length === 0) {
//           toast("No more images found", { type: "info" });
//         }
//         setImages((prevImages) => [...prevImages, ...data.results]);
//       } catch (err) {
//         setError("Failed to fetch images. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadImages();

//     return () => {
//       setLoading(false);
//     };
//   }, [query, page]);

//   const handleSearchSubmit = (query) => {
//     setQuery(query);
//     setPage(1);
//     setImages([]);
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div id="root">
//       <Toaster /> {/* Show toast notifications */}
//       <header>
//         <SearchBar onSubmit={handleSearchSubmit} />
//       </header>
//       {loading && <Loader />}
//       {error && <ErrorMessage message={error} />}
//       {!loading && !error && (
//         <>
//           <ImageGallery images={images} onImageClick={handleImageClick} />
//           {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
//         </>
//       )}
//       {selectedImage && (
//         <ImageModal image={selectedImage} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "./components/api";
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

  const loadMoreRef = useRef(null); // Reference for the Load More button

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
      // Wait until images are loaded and then scroll to the bottom
      setTimeout(() => {
        if (loadMoreRef.current) {
          loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Adjust timing if necessary
    }
  }, [loadingMore]);

  const handleSearchSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

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
      <Toaster /> {/* Show toast notifications */}
      <header>
        <SearchBar onSubmit={handleSearchSubmit} />
      </header>
      {loading && !loadingMore && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          <div className="load-more-container">
            {loadingMore ? (
              <Loader />
            ) : (
              images.length > 0 && (
                <div ref={loadMoreRef}>
                  <LoadMoreBtn onClick={handleLoadMore} />
                </div>
              )
            )}
          </div>
        </>
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
