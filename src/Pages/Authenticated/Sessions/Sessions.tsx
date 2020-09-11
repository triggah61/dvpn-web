/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {FC, useEffect, useState} from 'react';
import {Pagination, Session, SessionResponse} from 'mysterium-vpn-js';
import {CircularProgress} from '@material-ui/core';
import Header from '../Components/Header';
import "../../../assets/styles/pages/authenticated/pages/sessions.scss"
import {ReactComponent as Logo} from '../../../assets/images/authenticated/pages/sessions/logo.svg';
import {ReactComponent as StarIcon} from '../../../assets/images/authenticated/pages/sessions/star-icon.svg'
import {ReactComponent as Flag} from '../../../assets/images/authenticated/pages/sessions/flag.svg'
import {tequilapiClient} from '../../../api/TequilApiClient';
import '../../../assets/styles/pages/sessionsList.scss';
import SessionsSideList from '../SessionSideList/SessionsSideList';
import PaginationMaterial from '@material-ui/lab/Pagination';

import SessionList from './SessionList';

interface StateProps {
  isLoading: boolean;
  pageSize: number;
  sessions: Session[];
  paging?: Pagination;
  currentPage: number;
  lastPage: number
}

const Sessions: FC = () => {
  const [state, setState] = useState<StateProps>({
    sessions: [],
    isLoading: true,
    pageSize: 10,
    currentPage: 1,
    lastPage: 10
  });
  useEffect(() => {
    Promise.all([1])
      .then(() => tequilapiClient.sessions({pageSize: state.pageSize, page: state.currentPage}))
      .then((resp) => setState({...state, isLoading: false, sessions: resp.sessions, paging: resp.paging}))
      .catch((err) => {
      });
  }, [state.pageSize, state.currentPage]);

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({...state, pageSize: parseInt(event.target.value, 10)});
  };

  const onChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setState({...state, currentPage: newPage + 1});
  };
  const allSessions = state.sessions;

  const handlePrevPageButtonClick = () => {
    setState({...state, currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1})
  };

  const handleNextPageButtonClick = () => {
    setState({...state, currentPage: state.currentPage == state.lastPage ? state.lastPage : state.currentPage + 1})
  };

  return (
    <div className="sessions wrapper">
      {/*<div className="sessions--content">*/}
      {/*    <div>*/}
      {/*        <Header logo={Logo} name="Sessions" />*/}
      {/*    </div>*/}
      {/*    {state.isLoading ? (*/}
      {/*        <CircularProgress className="spinner" />*/}
      {/*    ) : (*/}
      {/*        <SessionList*/}
      {/*            sessions={allSessions}*/}
      {/*            pagination={{*/}
      {/*                count: state.paging?.totalItems || 0,*/}
      {/*                page: state.paging?.currentPage || 1,*/}
      {/*                rowsPerPage: state.pageSize,*/}
      {/*                onChangePage: onChangePage,*/}
      {/*                onChangeRowsPerPage: onChangeRowsPerPage,*/}
      {/*            }}*/}
      {/*        />*/}
      {/*    )}*/}
      {/*</div>*/}

      <div className="sessions--content">
        <Header logo={Logo} name="Sessions"/>
        <div className="sessions--list">
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
          <div className="list-block">
            <div className="list-block--item">
              <div className="value country">
                <div className="country-placeholder"></div>
                <p>Lithuania</p>
              </div>
              <div className="value protocol">
                <p>
                  <span className="star-icon"><StarIcon/></span>
                  4.2
                  <span
                    className="out-of"
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
            <div className="list-block--item">
              <div className="value country">
                <div className="country-placeholder filled">
                  <Flag/>
                </div>
                <p>Lithuania</p>
              </div>
              <div className="value protocol">
                <p>
                  <span className="star-icon"><StarIcon/></span>
                  4.2
                  <span
                    className="out-of"
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
                <PaginationMaterial
                  page={state.currentPage}
                  hideNextButton={true}
                  hidePrevButton={true}
                  count={state.lastPage}
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
        <SessionsSideList/>
      </div>
    </div>
  );
};

export default Sessions;
