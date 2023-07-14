import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { fetchCocktails } from "../redux/features/cocktailSlice";

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
  return <Layout>HomePage</Layout>;
};

export default HomePage;
