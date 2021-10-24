import react, { Component } from "react";
import { toast } from "react-toastify";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChangeQuery = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
    // [e.currentTarget.name]: e.currentTarget.value,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.query.trim() === "") {
      return toast.warn("Please, specify your search");
    }
    this.props.onSubmit(this.state.query);
    this.setState({
      query: "",
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleChangeQuery}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
