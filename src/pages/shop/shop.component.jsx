import React from "react";
import { Route } from "react-router-dom";

import './shop.styles.scss';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import StickyCart from '../../components/sticky-cart/sticky-cart.component';

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    <StickyCart className='sticky-cart' />
  </div>
);

export default ShopPage;
