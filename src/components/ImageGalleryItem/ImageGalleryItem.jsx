import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { isModalOpen, isScrolled } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <Item>
        <Image onClick={this.toggleModal} src={webformatURL} alt={tags} />
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={this.toggleModal}
            isScrolled={isScrolled}
          />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
