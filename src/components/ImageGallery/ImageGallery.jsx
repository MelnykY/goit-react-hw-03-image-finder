import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../../API/fetch';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  SUCCESS: 'success',
};

export class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    isLoading: false,
    isMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;

    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({
        isLoading: true,
      });

      try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0) {
          this.setState({
            status: Status.IDLE,
          });
          toast.error('No results were found for your request');
          return;
        }

        this.setState({
          isMore: data.hits.length === 12,
        });

        const images = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        if (prevProps.query !== query) {
          toast.success(`We found ${data.totalHits} images`);
          this.setState({
            status: Status.SUCCESS,
            images: [...images],
          });
        } else {
          this.setState({
            images: [...prevState.images, ...images],
          });
        }

        const totalPages = Math.ceil(data.totalHits / 12);
        if (page === totalPages && page > 1) {
          toast.info(`You reached end of results`);
        }
      } catch (error) {
        toast.error('Sorry, something went wrong. Please, try again');
        this.setState({
          status: Status.IDLE,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { status, images, isLoading, isMore } = this.state;
    const { handleCilck } = this.props;

    return (
      <>
        {isLoading && <Loader visible={isLoading} />}

        {status === 'success' && (
          <Gallery>
            {images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </Gallery>
        )}

        {isMore && <Button onClick={handleCilck} />}

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleCilck: PropTypes.func.isRequired,
};
