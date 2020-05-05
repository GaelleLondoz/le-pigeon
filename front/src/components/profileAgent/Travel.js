import React, { useState, useEffect } from "react";
import UserDestionationsAPI from "../../../components/services/userDestinationsAPI";
import { formatDate } from "../../../helpers/formatDate";

const Travel = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async (id) => {
    try {
      const data = await UserDestionationsAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestinations(id);
  }, [id]);

  console.log(destinations);
  return (
    <>
      <h1>Liste de vos voyages</h1>
      <p>
        Vous avez actuellement effectué <strong>{destinations.length}</strong>{" "}
        voyage(s)
      </p>

      {destinations.map((destination) => (
        <div key={destination.id} className="list-destinations-profile-agent">
          <p>Nom de votre destination: {destination.Destination.name}</p>
          <p>Continent : {destination.Destination.Continent.name}</p>
          <p>Pays : {destination.Destination.Country.name}</p>
          <p>Remarque : {destination.remarks}</p>
          <p>Parti le : {formatDate(destination.date)}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Travel;
