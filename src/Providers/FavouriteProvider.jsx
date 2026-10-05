import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { FavContext } from "../Contexts/FavouriteContext";
import { FavouriteService } from "../services/FavouriteService";

const FavProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [favourite, setFavourite] = useState(() => {
    const savedGuestFavourite = localStorage.getItem("itemFav");

    return savedGuestFavourite
      ? JSON.parse(savedGuestFavourite)
      : [];
  });

  useEffect(() => {
    if (!user) return;

    FavouriteService.GetFavouriteApi()
      .then((data) => {
        setFavourite(data.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  return (
    <FavContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;