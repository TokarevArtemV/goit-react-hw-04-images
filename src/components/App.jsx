import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import * as ImageService from '../API/Api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImage();
    }

    async function fetchImage() {
      try {
        const { hits, totalHits } = await ImageService.getImages(query, page);

        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        if (hits.length < 12) {
          toast.success(
            "We're sorry, but you've reached the end of search results."
          );
        }

        setStatus('loading');
        setImages(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setStatus('idle');
      }
    }
  }, [query, page]);

  const loadMoreImages = () => {
    setStatus('loading');
    setPage(prevState => prevState + 1);
  };

  const handleSerch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoadMore(false);
    setIsEmpty(false);
    setStatus('loading');
  };

  const handlerModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setStatus('loading');
    setShowModal(true);
  };

  const handlerCloseModal = () => {
    setShowModal(prevState => !prevState);
    setLargeImageURL('');
  };

  return (
    <div className="App">
      <Searchbar handleSerch={handleSerch} />
      {images.length > 0 && (
        <ImageGallery images={images} onModal={handlerModal} />
      )}
      {isLoadMore && <Button loadMore={loadMoreImages} />}
      {showModal && (
        <Modal
          imgSrc={largeImageURL}
          imgAlt={tags}
          onCloseModal={handlerCloseModal}
          onChangeStatus={setStatus}
        />
      )}
      {error && <p className="textEmpty">Sorry. {error} 😭</p>}
      {isEmpty && <p className="textEmpty">Sorry. There are no images... 😭</p>}
      {status === 'loading' && <Loader />}
      <ToastContainer autoClose={2000} hideProgressBar={true} theme="light" />
    </div>
  );
};
