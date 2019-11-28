import React, {Component, Fragment} from 'react';
import APP from '../services/client';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItemView: false
    }
  }

  render() {
    APP.client.db.get(`${APP.currentUser.id}`).then(data => {
      console.log(data);
      // [TODO]: Use this to render the list of recents used.
    });

    const {listItemView} = this.state;

    const toggleListItem = () => {
      this.setState(prevState => ({
        listItemView: !prevState.listItemView,
      }));
    }

    console.log('listItemView', listItemView);
    
    return (
      <Fragment>
        {/* <div className="list-container-icon"> */}
          <button type="button" className="hamburger" onClick={toggleListItem}>
            <img alt="List Item" src="https://img.icons8.com/ios-glyphs/50/000000/menu.png" />
          </button>
        {/* </div> */}
        {listItemView ?
        <div className="top-items-absolute-container">
          <div className="top-items-relative-container">
            <div className="top-items-container-header">Top asks</div>
            <div className="top-items-container-list">Freddy the robot</div>
            <div className="top-items-container-list">Kamal the dirty</div>
            <div className="top-items-container-list">Monday syed</div>
          </div>
        </div> : null}
      </Fragment>
    )
  }
};

export default ListItem;
