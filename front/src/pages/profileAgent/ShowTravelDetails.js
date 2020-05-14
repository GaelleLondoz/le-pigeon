import React, { useState, useEffect } from "react";
import ShowDestination from "../../components/agent/ShowDestination";
import UserAPI from "../../components/services/userAPI";

const ShowTravelDetails = ({ match }) => {
  const { id } = match.params;
  const { destinationId } = match.params;

  const [destination, setDestination] = useState({
    date: "",
    remarks: "",
    Destination: {
      Continent: {},
      Country: {},
    },
  });

  const fetchDestination = async (id, destinationId) => {
    try {
      const data = await UserAPI.getDestinationByUser(id, destinationId);
      const { date, remarks, Destination } = data;
      setDestination({ date, remarks, Destination });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestination(id, destinationId);
  }, [id, destinationId]);

  //console.log(destination);

  return <ShowDestination destination={destination} />;
};

export default ShowTravelDetails;
