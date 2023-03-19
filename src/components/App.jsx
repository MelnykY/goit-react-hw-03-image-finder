import { Component } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { StyledApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../API/fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

const Status = {
      IDLE: 'idle',
      SUCCESS: 'success',
};
    
export class App extends Component {
  state = {
    page: 1,
    query: '',
    status: Status.IDLE,
    images: [],
    isLoading: false,
    isMore: false,
  };

handleSubmit = ({ query }, { resetForm }) => {
    this.setState({ query, page: 1 });
    resetForm();
  };

  handleCilck = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
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
        if (prevState.query !== query) {
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
    const { images, isLoading, isMore } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} handleCilck={this.handleCilck} />
        {isLoading && <Loader visible={isLoading} />}
        {isMore && <Button onClick={this.handleCilck} />}
        <ToastContainer autoClose={2000} />
        <GlobalStyles />
      </StyledApp>
    );
  }
}
