import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { fetchCocktails } from "../redux/features/cocktailSlice";
import SpinnerAnim from "../components/shared/SpinnerAnim";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);

  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const {
          idDrink,
          strDrink,
          strCategory,
          strAlcoholic,
          strInstructions,
          strDrinkThumb,
        } = item;
        return {
          id: idDrink,
          name: strDrink,
          instructions: strInstructions,
          category: strCategory,
          isAlcoholic: strAlcoholic,
          img: strDrinkThumb,
        };
      });
      setModifiedCocktails(newCocktails);
    } else {
      setModifiedCocktails([]);
    }
  }, []);
  return (
    <>
      {error && <span>{error.message}</span>}
      {loading ? (
        <SpinnerAnim />
      ) : (
        <div className="container">
          <div className="row">
            {modifiedCocktails.map((item) => (
              <div className="col-md-3 mt-3 m-1" key={item.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h5 className="card-title">{item.isAlcoholic}</h5>
                    <p className="card-text">{item.instructions}</p>
                    <Link
                      to={`/products/${item.id}`}
                      className="btn btn-primary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
