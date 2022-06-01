import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";

import { Api } from "./shared/service/Api";
import "./App.css";

const initialState = {
  pictures: [],
  isLoading: false,
  error: false,
  finish: false,
  showModal: false,
  largeImageURL: "",
  tags: "",
};
const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);

  const onChangeQwery = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) return;
    setState({ pictures: [], isLoading: true, finish: false });
    fetchPictures();
  }, [query]);
  useEffect(() => {
    if (!query) return;
    fetchPictures();
  }, [page]);

  const fetchPictures = async () => {
    try {
      const { data } = await Api.searchPictures(page, query);
      setState(({ pictures }) => {
        const newState = {
          pictures: [...pictures, ...data.hits],
          isLoading: false,
          error: false,
        };
        if (data.hits.length < 11) {
          newState.finish = true;
        }
        if (!data.hits.length) {
          newState.error = true;
        }
        return newState;
      });
    } catch (error) {
      setState({
        isLoading: false,
        error,
      });
    }
  };
  const { pictures, error, isLoading, finish, showModal, largeImageURL, tags } =
    state;
  const loadMore = () => {
    setPage((prevState) => {
      return prevState + 1;
    });
    state.isLoading = true;
    setState({ ...state });
  };

  const handleOpenModal = (id) => {
    setState((prevState) => {
      const { pictures } = prevState;

      const { largeImageURL, tags } = pictures.find(
        (picture) => picture.id === id
      );
      prevState.showModal = true;
      prevState.largeImageURL = largeImageURL;
      prevState.tags = tags;
      return { ...prevState };
    });
  };
  const closeModal = (e) => {
    state.showModal = false;
    setState({ ...state });
  };
  return (
    <div className="App">
      <Searchbar onSubmit={onChangeQwery} />
      {error && <h1>Impossible to load more pictures!</h1>}
      {!error && <ImageGallery pictures={pictures} onClick={handleOpenModal} />}
      {!finish && pictures.length !== 0 && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal showModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </div>
  );
};

export default App;
