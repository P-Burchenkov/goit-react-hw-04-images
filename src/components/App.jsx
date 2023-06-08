import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

import fetchImage from '../../src/services/api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState(null);
  const [largeImgTag, setLargeImgTag] = useState(null);

  const handleSubmitSearch = ({ query }, { resetForm }) => {
    if (query.trim() === '') {
      return toast.warning('Please, enter something');
    }

    setQuery(query);
    setPage(1);
    setImages([]);
    setIsBtnVisible(false);

    resetForm();
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsloading(true);
    try {
      fetchImage(query, page).then(({ hits }) => {
        if (!hits.length) {
          setIsloading(false);
          return toast.warning(`Ooops, there is no image with name ${query}`);
        }

        setImages(prevImg => [...prevImg, ...hits]);
        setIsloading(false);
        setIsBtnVisible(hits.length === 12);
      });
    } catch (error) {
      toast.warning(error.message);
      setIsloading(false);
    }
  }, [query, page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = e => {
    setShowModal(true);
    setLargeImgUrl(e.currentTarget.dataset.largeimgurl);
    setLargeImgTag(e.currentTarget.alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImgUrl(null);
    setLargeImgTag(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleSubmitSearch} />

      <ImageGallery images={images} onClick={openModal} />

      {isBtnVisible && <Button onClick={onLoadMore} />}

      {isLoading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}

      {showModal && (
        <Modal url={largeImgUrl} tags={largeImgTag} onClose={closeModal} />
      )}

      <ToastContainer />
    </div>
  );
}
