import react from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, toggleModal, handleSetLargeImageURL }) => {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          toggleModal={toggleModal}
          largeImageURL={image.largeImageURL}
          handleSetLargeImageURL={handleSetLargeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
