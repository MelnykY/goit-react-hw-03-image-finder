import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import { Background } from './Loader.styled';

export const Loader = ({ visible }) => {
  return (
    <Background>
      <ColorRing
        visible={visible}
        height="150"
        width="150"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%)',
        }}
        wrapperClass="blocks-wrapper"
        colors={['#24045a', '#600fe2', '#945eeb', '#c2abe9', '#f1f1f1']}
      />
    </Background>
  );
};

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
