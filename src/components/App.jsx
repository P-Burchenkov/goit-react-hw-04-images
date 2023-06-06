import { Component } from 'react';
import SearchBar from './Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

import fetchImage from '../../src/services/api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export class App extends Component {
  state = {
    query: null,
    images: [],
    isLoading: false,
    page: 1,
    isBtnVisible: false,
    showModal: false,
    largeImgUrl: null,
    largeImgTag: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });
      try {
        fetchImage(query, page).then(({ hits }) => {
          if (!hits.length) {
            this.setState({ isLoading: false });
            return toast.warning(`Ooops, there is no image with name ${query}`);
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            isLoading: false,
            isBtnVisible:
              this.state.page === [...prevState.images, ...hits].length / 12,
          }));
        });
      } catch (error) {
        toast.warning(error.message);
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmitSearch = ({ query }, { resetForm }) => {
    if (query.trim() === '') {
      return toast.warning('Please, enter something');
    }

    this.setState({
      query,
      page: 1,
      images: [],
      isBtnVisible: false,
    });
    resetForm();
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = e => {
    this.setState({
      showModal: true,
      largeImgUrl: e.currentTarget.dataset.largeimgurl,
      largeImgTag: e.currentTarget.alt,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImgUrl: null,
      largeImgTag: null,
    });
  };

  render() {
    const { showModal, isBtnVisible, isLoading, images } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.handleSubmitSearch} />

        <ImageGallery images={images} onClick={this.openModal} />

        {isBtnVisible && <Button onClick={this.onLoadMore} />}

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
          <Modal
            url={this.state.largeImgUrl}
            tags={this.state.largeImgTag}
            onClose={this.closeModal}
          />
        )}

        <ToastContainer />
      </div>
    );
  }
}
