import Carosel from "../../Components/Carousel/Carousel";
import "./Home.scss";
import useFetch from "../../Components/Service/useFetch";
import { url } from "../../Components/Constants/Constants";
import { useHistory } from "react-router-dom";

function Home() {
  const { data, load } = useFetch(url);
  const history = useHistory();

  const goNext = () => {
    history.push("/intro");
  };

  return (
    <div className="home">
      <Carosel
        data={data}
        load={load}
        endPoint={{ desktop: 4, tablet: 2, mobile: 1 }}
      />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus nemo
        eligendi iste labore a maxime molestiae deserunt impedit explicabo
        ratione.
      </p>
      <button onClick={goNext} className="aplication-button">
        Start aplication proces
      </button>
    </div>
  );
}

export default Home;
