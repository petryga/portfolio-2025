import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { stripTrackingParamsAfterLoad } from "@/lib/stripTrackingParams";

createRoot(document.getElementById("root")!).render(<App />);

stripTrackingParamsAfterLoad();
