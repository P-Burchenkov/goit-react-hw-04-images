import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, tags, onClick, largeUrl }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={url}
        alt={tags}
        onClick={onClick}
        data-largeimgurl={largeUrl}
        className={css.ImageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
