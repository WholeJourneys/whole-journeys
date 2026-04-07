import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutKathy from "@/pages/AboutKathy";
import ActiveFoodieTravel from "@/pages/ActiveFoodieTravel";
import LongDistanceTrails from "@/pages/LongDistanceTrails";
import ItalyCulinaryTours from "@/pages/ItalyCulinaryTours";
import WomensAdventureTravel from "@/pages/WomensAdventureTravel";
import PrivateCustomTrips from "@/pages/PrivateCustomTrips";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about-kathy" component={AboutKathy} />
        <Route path="/what-is-active-foodie-travel" component={ActiveFoodieTravel} />
        <Route path="/long-distance-trail-hiking-guide" component={LongDistanceTrails} />
        <Route path="/culinary-walking-tours-italy" component={ItalyCulinaryTours} />
        <Route path="/womens-adventure-travel" component={WomensAdventureTravel} />
        <Route path="/private-custom-trips" component={PrivateCustomTrips} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
