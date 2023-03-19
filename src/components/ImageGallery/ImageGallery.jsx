import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <>
        <Gallery>
          {images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </Gallery>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
