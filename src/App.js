import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import { Component } from "react";
import Modal from "./components/Modal/Modal";
import { getPictures } from "./servises/api-services";
import Loader from "react-loader-spinner";
import s from "./App.module.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    query: "",
    hits: [],
    showModal: false,
    largeImageURL: "",
    page: 1,
    isLoading: false,
  };

  handleSearchForm = (query) => {
    this.setState({ query });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const page = this.state.page;

    if (nextQuery !== prevQuery) {
      this.setState({ page: 1, hits: [] });
      this.getImages({ nextQuery: nextQuery, page: 1 });
    }

    if (page !== prevState.page && page !== 1) {
      this.getImages({ nextQuery: nextQuery, page: page });
    }
  }

  getImages = (nextQuery, page) => {
    getPictures(nextQuery, page)
      .then((data) => {
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...data],
        }));
      })
      .then(() => {
        return window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  handleSetLargeImageURL = (largeImageURL) => {
    this.setState(largeImageURL);
  };

  loadMorePicsBttn = () => {
    this.setState({ isLoading: true });
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
   this.setState({ isLoading: false });
  };

  render() {
    const { showModal, largeImageURL, isLoading, hits } = this.state;
    const renderLoadMoreBttn = hits.length > 0 && !isLoading;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSearchForm} />
        <ToastContainer
          position="top-right"
          transition={Flip}
          autoClose={3000}
          theme={"dark"}
        />
        <ImageGallery
          images={hits}
          toggleModal={this.toggleModal}
          handleSetLargeImageURL={this.handleSetLargeImageURL}
        />

        {renderLoadMoreBttn && <Button onLoadMore={this.loadMorePicsBttn} />}

        <div className={s.loaderwrapper}>
          {isLoading && (
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
