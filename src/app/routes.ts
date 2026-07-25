import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { HomePage } from "./HomePage";
import { Catalog } from "./components/Catalog";
import { PetDetail } from "./components/PetDetail";
import { ManadasView } from "./components/ManadasView";
import { ManadaDetailView } from "./components/ManadaDetailView";
import { ConfigurarManada } from "./pages/ConfigurarManada";
import { Dashboard } from "./pages/Dashboard";
import { DashboardEvidencias } from "./pages/DashboardEvidencias";
import { DashboardManada } from "./pages/DashboardManada";
import { FundacionesList } from "./components/FundacionesList";
import { FundacionDetail } from "./components/FundacionDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "mascotas",
        Component: Catalog,
      },
      {
        path: "mascota/:id",
        Component: PetDetail,
      },
      {
        path: "manadas",
        Component: ManadasView,
      },
      {
        path: "manada/:id",
        Component: ManadaDetailView,
      },
      {
        path: "mi-manada/configurar",
        Component: ConfigurarManada,
      },
      {
        path: "carrito",
        Component: ConfigurarManada,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "dashboard/evidencias",
        Component: DashboardEvidencias,
      },
      {
        path: "dashboard/manada",
        Component: DashboardManada,
      },
      {
        path: "fundaciones",
        Component: FundacionesList,
      },
      {
        path: "fundaciones/:id",
        Component: FundacionDetail,
      }
    ],
  },
]);
