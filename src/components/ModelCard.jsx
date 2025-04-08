import React, { useState } from "react";
import axios from "axios";
import "./ModelCard.css";

function ModelCard({ title, modelName }) {
  const [inputs, setInputs] = useState({
    l: "",
    alpha_pv: "",
    Load: "",
    Cs2: "",
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...inputs,
        model: modelName,
        l: parseFloat(inputs.l),
        alpha_pv: parseFloat(inputs.alpha_pv),
        Load: parseFloat(inputs.Load),
        Cs2: parseFloat(inputs.Cs2),
      };

      const response = await axios.post(
        "https://ml-thrustpad-app.onrender.com/predict",
        payload
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
      setResults({ error: "Prediction failed." });
    }
  };

  return (
    <div className="model-card">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        {["l", "alpha_pv", "Load", "Cs2"].map((param) => (
          <div className="form-group" key={param}>
            <label>{param}</label>
            <input
              type="number"
              name={param}
              step="any"
              value={inputs[param]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {results && (
        <div className="results">
          {results.error ? (
            <p className="error">{results.error}</p>
          ) : (
            <ul>
              {Object.entries(results).map(([k, v]) => (
                <li key={k}>
                  <strong>{k}</strong>: {Number(v).toFixed(6)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ModelCard;
