import React, { useState, useEffect } from "react";
import ShowDestination from "../../components/agent/ShowDestination";
import UserAPI from "../../components/services/userAPI";
import UserDestinationAPI from "../../components/services/userDestinationsAPI";

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
  const [pictures, setPictures] = useState([]);

  const fetchDestination = async (id, destinationId) => {
    try {
      const data = await UserAPI.getDestinationByUser(id, destinationId);
      const { date, remarks, Destination } = data;
      setDestination({ date, remarks, Destination });
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchPicturesByDestination = async (id, destinationId) => {
    try {
      const data = await UserDestinationAPI.getAllPicturesByDestination(
        id,
        destinationId
      );
      setPictures(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestination(id, destinationId);
  }, [id, destinationId]);
  useEffect(() => {
    fetchPicturesByDestination(id, destinationId);
  }, [id, destinationId]);

  //console.log(destination);
  console.log(pictures);

  return <ShowDestination destination={destination} pictures={pictures} />;
};

export default ShowTravelDetails;
