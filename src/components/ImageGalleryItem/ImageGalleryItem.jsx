import react from "react";

function ImageGalleryItem({
  image,
  toggleModal,
  handleSetLargeImageURL,
  largeImageURL,
}) {
  const handleClick = (e) => {
    toggleModal();
    handleSetLargeImageURL({ largeImageURL });
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        onClick={handleClick}
        alt=""
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export default ImageGalleryItem;
