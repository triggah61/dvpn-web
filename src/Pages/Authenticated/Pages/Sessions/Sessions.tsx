import React from "react";
import Header from "../../Components/Header";
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/sessions/logo.svg'
import {ReactComponent as StarIcon} from '../../../../assets/images/authenticated/pages/sessions/star-icon.svg'
import {ReactComponent as Flag} from '../../../../assets/images/authenticated/pages/sessions/flag.svg'
import "../../../../assets/styles/pages/authenticated/pages/sessions.scss"
import SessionsSideList, {SessionsSideListPropsInterface} from "../components/SessionsSideList";
import {RootState} from "../../../../redux/store";
import {fetchSessions} from "../../../../redux/actions/dashboard/dashboard";
import {Pagination, PaginationItem} from '@material-ui/lab';
import {connect} from "react-redux";

interface PropsInterface {
  sessions: SessionsSideListPropsInterface
  fetchSessions: Function,
}

interface StateInterface {
  page: number,
  lastPage: number
}

const mapStateToProps = (state: RootState) => ({
  sessions: state.dashboard.sessions,
});

const mapDispatchToProps = {
  fetchSessions: fetchSessions
}

const Sessions = (props: PropsInterface) => {
  const [values, setValues] = React.useState<StateInterface>({
    page: 1,
    lastPage: 5
  });

  const handlePrevPageButtonClick = () => {
    setValues({...values, page: values.page > 1 ? values.page - 1 : 1})
  };

  const handleNextPageButtonClick = () => {
    setValues({...values, page: values.page == values.lastPage ? values.lastPage : values.page + 1})
  };

  return (
    <div className="sessions wrapper">
      <div className="sessions--content">
        <Header logo={Logo} name="Sessions"/>
        <div className="sessions--list-wrapper">
          <div className="header-row">
            <div className="header-row--title country">
              <p>Country</p>
            </div>
            <div className="header-row--title protocol">
              <p>Protocol</p>
            </div>
            <div className="header-row--title duration">
              <p>Duration</p>
            </div>
            <div className="header-row--title earnings">
              <p>Earnings</p>
            </div>
            <div className="header-row--title transfered">
              <p>Transfered</p>
            </div>
            <div className="header-row--title id">
              <p>Session ID</p>
            </div>
          </div>
          <div className="list">
            <div className="list--item">
              <div className="value country">
                <div className="country-placeholder"></div>
                <p>Lithuania</p>
              </div>
              <div className="value protocol">
                <p>
                  <span className="protocol-star-icon"><StarIcon/></span>
                   4.2
                  <span
                className="protocol-out-of"
                  >
                    / 5.0
                  </span>
                </p>
              </div>
              <div className="value duration"></div>
              <div className="value earnings"><p>1.368 MYST</p></div>
              <div className="value transfered"><p>14.2Gb</p></div>
              <div className="value id"><p>326cff6d</p></div>
            </div>
            <div className="list--item">
              <div className="value country">
                <div className="country-placeholder filled">
                  <Flag/>
                </div>
                <p>Lithuania</p>
              </div>
              <div className="value protocol">
                <p>
                  <span className="protocol-star-icon"><StarIcon/></span>
                  4.2
                  <span
                    className="protocol-out-of"
                  >
                    / 5.0
                  </span>
                </p>
              </div>
              <div className="value duration"></div>
              <div className="value earnings"><p>1.368 MYST</p></div>
              <div className="value transfered"><p>14.2Gb</p></div>
              <div className="value id"><p>326cff6d</p></div>
            </div>
            <div className="pagination-row">
              <div
                className="prev pagination-button"
                onClick={() => handlePrevPageButtonClick()}
              >
                <p>Prev</p>
              </div>
              <div className="pagination">
                <Pagination
                  page={values.page}
                  hideNextButton={true}
                  hidePrevButton={true}
                  count={values.lastPage}
                  variant="outlined"
                  shape="rounded"/>
              </div>
              <div
                className="next pagination-button"
                onClick={() => handleNextPageButtonClick()}
              >
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sessions--side">
        <SessionsSideList {...props.sessions}/>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sessions);
