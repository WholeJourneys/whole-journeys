import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Picks from "./pages/Picks";
import Hotels from "./pages/Hotels";
import TermsAndConditions from "./pages/TermsAndConditions";
import TripInquiry from "./pages/TripInquiry";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={Tours} />
      <Route path="/about" component={About} />
      <Route path="/picks" component={Picks} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/admin" component={Admin} />
      <Route path="/terms" component={TermsAndConditions} />
      <Route path="/inquiry" component={TripInquiry} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
