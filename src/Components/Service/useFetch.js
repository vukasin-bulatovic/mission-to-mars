import { useState, useEffect } from "react";
const useFetch = (url) => {
  const axios = require("axios");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(url).then((data) => setData(data));
  }, [axios, url]);

  return { data };
};

export default useFetch;
