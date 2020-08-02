import React from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../actions/alert';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      <span
        onClick={() => clearAlert}
        className='fa fa-times float-right'
      ></span>
      {alert.msg}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { clearAlert })(Alert);
