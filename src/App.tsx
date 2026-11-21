import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/lib/pages";
import { LightboxHost, PageShell, ScrollToTop } from "@/lib/components";
import { AppContextProvider, MovesContextProvider } from "@/lib/context";
import HomePage from "@/lib/pages/HomePage";
import AppConfig from "./lib/components/appConfig";

function App() {
  return (
    <AppContextProvider>
      <MovesContextProvider>
        <AppConfig>
          <BrowserRouter>
            <LightboxHost>
              <ScrollToTop />

              <PageShell>
                <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/:category/:projectSlug" element={null} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </PageShell>
            </LightboxHost>
          </BrowserRouter>
        </AppConfig>
      </MovesContextProvider>
    </AppContextProvider>
  );
}

export default App;
