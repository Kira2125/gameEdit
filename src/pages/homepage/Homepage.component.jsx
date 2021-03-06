import React, {Component} from 'react';
import css from './Homepage.module.scss';
import MainSlider from "../../components/MainSlider/MainSlider.component";
import LastNews from "../../components/LastNews/LastNews.component";
import LastGames from "../../components/LastGames/LastGames.component";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase";
import {connect} from "react-redux";
import {updateCollectionsAC} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/withSpinner/WithSpinner.component";
import {toggleSpinnerAC} from "../../redux/spinner/spinner.actions";
import {createStructuredSelector} from "reselect";
import {isLoadingSelector} from "../../redux/spinner/spinner.selectors";


const MainSliderWithSpinner = WithSpinner(MainSlider);
const LastGamesWithSpinner = WithSpinner(LastGames);
const LastNewsWithSpinner = WithSpinner(LastNews);

class Homepage extends Component {

    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const {updateCollection, toggleLoading} = this.props;
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollection(collectionsMap);
            toggleLoading(false);
        })
    }
    render() {
        return (
            <div className={css.homepage}>
                <MainSliderWithSpinner isLoading={this.props.isLoading}/>
                <LastNewsWithSpinner isLoading={this.props.isLoading}/>
                <LastGamesWithSpinner isLoading={this.props.isLoading}/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isLoading: isLoadingSelector
})

const mapDispatchToProps = (dispatch) => ({
    updateCollection: collectionMap => dispatch(updateCollectionsAC(collectionMap)),
    toggleLoading: toggle => dispatch(toggleSpinnerAC(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);