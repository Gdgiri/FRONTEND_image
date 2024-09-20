import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.map((ele) => (
              <div className="col-md-6 mb-4" key={ele._id}>
                <Cards ele={ele} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDetails;
