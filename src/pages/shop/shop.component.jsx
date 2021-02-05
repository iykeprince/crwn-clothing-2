import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateCollection } from "../../redux/shop/shop.actions";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.util";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unSubscribeForCollection = null;
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollection(collectionsMap);
      this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}  />} />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}
const mapStateToDispatch = (dispatch) => ({
  updateCollection: (collections) => dispatch(updateCollection(collections)),
});
export default connect(null, mapStateToDispatch)(ShopPage);
