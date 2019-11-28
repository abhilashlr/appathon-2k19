import React, {Component} from 'react';
import APP from '../services/client';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      listItems: []
    }
  }
  componentDidMount() {
    APP.client.db.get(`${APP.currentUser.id}`).then(data => {
      this.props.pushListItems(data.listItems);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listViewOpened !== this.props.listViewOpened && this.props.listViewOpened) {
      APP.client.db.get(`${APP.currentUser.id}`).then(data => {
        this.props.pushListItems(data.listItems);
      });
    }
  }

  render() {
    const {listViewOpened, getListItems} = this.props;
    return (
      <div className={`animated faster top-items-absolute-container ${listViewOpened ? 'slideInUp' : 'slideOutDown fadeOut'}`}>
        <div className="top-items-relative-container">
        <div className="top-items-container-header">Top asks</div>
        {getListItems && getListItems.slice(getListItems.length - 3).map(item => (
          <div className="top-items-container-list">{item.key}</div>
        ))}
        </div>
      </div>
    )
  }
}

export default ListItem;
