import { useState } from 'react';
import API from 'utils/api';

const useGists = () => {
  const [gists, setgists] = useState([]);

  const getGists = () => {
    API.get(`/gists/public`)
      .then((res) => {
        setgists(res.data);
      })
      .catch(function (error) {});
  };

  const createGist = (notepad) => {
    API.post(`/gists`, { files: {} })
      .then((res) => {
        setgists(res.data);
      })
      .catch(function (error) {});
  };

  return { gists, getGists, createGist };
};

export default useGists;
