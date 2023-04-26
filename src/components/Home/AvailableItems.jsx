import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { getAvailableItems, getUserData } from "../../sparegrubApi";
import Spinner from "react-bootstrap/Spinner";
import { calcDistance } from "../../utils/index";
import { findLatAndLon } from "../../utils";
import { Row, Col } from "react-bootstrap";

const AvailableItems = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  let [liveItems, setLiveItems] = useState([]);
  const [itemsRetrieved, setItemsRetrieved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const user = await getUserData(token);
      const user_id = user.id;
      const response = await getAvailableItems(token, user_id);
      setLiveItems(response);
      setItemsRetrieved(true);
    }
    fetchData();
  }, []);

  let items = [...liveItems];

  if (itemsRetrieved === false) {
    return (
      <>
        <div className="emptyErrorMessage">
          {" "}
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  if (searchTerm) {
    items = items.filter((product) => {
      return product.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  const range_preference = user.range_preference.split(" ")[0];
  const itemsInRange = [];
  items.map(async (item) => {
    if (item.latitude === null || item.longitude === null) {
      const location = await findLatAndLon(item.collection_location);
      item.latitude = location.latitude;
      item.longitude = location.longitude;
    }

    const dist = calcDistance(
      user.latitude,
      user.longitude,
      item.latitude,
      item.longitude,
      "M"
    );

    if (dist <= range_preference) {
      item.distance = dist;
      itemsInRange.push(item);
    }
  });

  if (items.length < 1 || itemsInRange < 1) {
    return (
      <div className="emptyErrorMessage">
        <h4>There are no items available within your range!</h4>
        <br></br>
        <h4 className="editProfileText">
          Try editing your range preference under your profile to see more
          items.
        </h4>
      </div>
    );
  }
  return (
    <div className="availableItemListing">
      <Row>
        {itemsInRange.map((item) => {
          return (
            <Col key={item.item_id} xs={12} md={6} xl={4}>
              <Item item={item} />{" "}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AvailableItems;
