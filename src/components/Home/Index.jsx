import React from "react";
import Search from "./Search";
import AvailableItems from "./AvailableItems";
import Navigation from "../../components/Navigation/Index";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container className="homePage">
        <Search />
        <AvailableItems />
      </Container>
      <Navigation />
    </>
  );
};

export default Home;
