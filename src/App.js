import React from "react";
import ModelCard from "./components/ModelCard";
import "./App.css";

function App() {
  const models = [
    { title: "Random Forest", modelName: "random_forest" },
    { title: "Decision Tree", modelName: "decision_tree" },
    { title: "Linear Regression", modelName: "linear_regression" },
    {
      title: "Multivariate Linear",
      modelName: "multivariate_linear_regression",
    },
    { title: "XGBoost", modelName: "xgboost" },
    { title: "Optimized FNN", modelName: "fnn" },
    { title: "Convolutional Neural Network (CNN)", modelName: "cnn" },
    { title: "Deep Neural Network (DNN)", modelName: "dnn" },
  ];

  return (
    <div className="App">
      <h1>🔧 Thrust Pad Bearing Predictor</h1>
      <div className="card-grid">
        {models.map((m) => (
          <ModelCard key={m.modelName} {...m} />
        ))}
      </div>
    </div>
  );
}

export default App;
