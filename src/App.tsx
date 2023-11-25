import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Planet = lazy(() => import("./components/planets"));
const PersonalInfo = lazy(() => import("./routes/PersonalInfo"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Planet />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
