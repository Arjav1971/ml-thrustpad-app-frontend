import React, { useState } from "react";
import axios from "axios";
import "./PredictionForm.css"; // ⬅️ Make sure this file exists

function PredictionForm() {
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
      const response = await axios.post("https://ml-thrustpad-app.onrender.com/predict", {
        l: parseFloat(inputs.l),
        alpha_pv: parseFloat(inputs.alpha_pv),
        Load: parseFloat(inputs.Load),
        Cs2: parseFloat(inputs.Cs2),
      });

      setResults(response.data);
    } catch (error) {
      console.error("❌ Error:", error);
      setResults({ error: "Prediction failed." });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>⚙️ Thrust Pad Bearing Predictor</h2>

      <form className="prediction-form" onSubmit={handleSubmit}>
        {["l", "alpha_pv", "Load", "Cs2"].map((param) => (
          <div className="form-group" key={param}>
            <label htmlFor={param}>{param}:</label>
            <input
              type="number"
              step="any"
              id={param}
              name={param}
              value={inputs[param]}
              onChange={handleChange}
              placeholder={`Enter ${param}`}
              required
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">
          🚀 Predict
        </button>
      </form>

      {results && (
        <div className="results-section">
          <h3>📊 Prediction Results</h3>
          {results.error ? (
            <p className="error-text">{results.error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Output</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(results).map(([key, val]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{Number(val).toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
