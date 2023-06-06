import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              tags={image.tags}
              onClick={onClick}
              largeUrl={image.largeImageURL}
            />
          );
        })}
    </ul>
  );
}
