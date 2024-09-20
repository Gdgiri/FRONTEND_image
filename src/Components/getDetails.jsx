import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const GetDetails = () => {
  const [data, setData] = useState([]); // Ensure `data` is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setData(res.data.result); // Assuming `res.data.result` is an array
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Get Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.map((ele) => (
            <Cards key={ele._id} ele={ele} /> // Return the `Cards` component
          ))}
        </>
      )}
    </div>
  );
};

export default GetDetails;
