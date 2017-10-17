import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Loading from '../component/loading';
import {confirmOK, confirmClose, hideProgress} from '../libs/common/actions/app';
import {hashHistory} from 'react-router';

class Containers extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    
    }

    render() {
        const {alert, confirmProps, loadingProgress,contextMenu, location} = this.props;
        return (
            <div>
                <Loading progress={loadingProgress}/>
                {this.props.children}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        alert: state.alert,
        confirmProps: state.confirm,
        contextMenu:state.contextMenu,
        loadingProgress: state.loadingProgress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        confirmOK: bindActionCreators(confirmOK, dispatch),
        confirmClose: bindActionCreators(confirmClose, dispatch),
        hideProgress: bindActionCreators(hideProgress, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Containers);