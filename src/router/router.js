import { createBrowserRouter } from "react-router";
import { ContractPage } from "./contract";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/contract",
    element: <ContractPage />, 
  },
]);
