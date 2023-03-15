import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FaSearch } from 'react-icons/fa';
import { SearchHeader, SearchForm, Input, SearchBtn } from './Searchbar.styled';

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchHeader>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        <SearchForm>
          <SearchBtn type="submit">
            <FaSearch />
          </SearchBtn>

          <Input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
