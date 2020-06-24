import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table, Card, CardHeader, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {
  openFile,
  byteSize,
  ICrudSearchAction,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './feed.reducer';
import { IBottle } from 'app/shared/model/bottle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IBottleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Feed = (props: IBottleProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    } else {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
  };

  const startSearching = () => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { bottleList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="bottle-heading">
        Bottles
        {/*<Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">*/}
        {/*  <FontAwesomeIcon icon="plus" />*/}
        {/*  &nbsp; Add to MyBook*/}
        {/*</Link>*/}
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      {/*<div className="table-responsive">*/}
      {/*  {bottleList && bottleList.length > 0 ? (*/}
      {/*    <Table responsive>*/}
      {/*      <thead>*/}
      {/*      <tr>*/}
      {/*        <th className="hand" onClick={sort('id')}>*/}
      {/*          ID <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('name')}>*/}
      {/*          Name <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('abv')}>*/}
      {/*          Abv <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('age')}>*/}
      {/*          Age <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('description')}>*/}
      {/*          Description <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('inBottle')}>*/}
      {/*          In Bottle <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th className="hand" onClick={sort('photo')}>*/}
      {/*          Photo <FontAwesomeIcon icon="sort" />*/}
      {/*        </th>*/}
      {/*        <th />*/}
      {/*      </tr>*/}
      {/*      </thead>*/}
      {/*      <tbody>*/}
      {/*      {bottleList.map((bottle, i) => (*/}
      {/*        <tr key={`entity-${i}`}>*/}
      {/*          <td>*/}
      {/*            <Button tag={Link} to={`${match.url}/${bottle.id}`} color="link" size="sm">*/}
      {/*              {bottle.id}*/}
      {/*            </Button>*/}
      {/*          </td>*/}
      {/*          <td>{bottle.name}</td>*/}
      {/*          <td>{bottle.abv}</td>*/}
      {/*          <td>{bottle.age}</td>*/}
      {/*          <td>{bottle.description}</td>*/}
      {/*          <td>{bottle.inBottle}</td>*/}
      {/*          <td>*/}
      {/*            {bottle.photo ? (*/}
      {/*              <div>*/}
      {/*                <a onClick={openFile(bottle.photoContentType, bottle.photo)}>*/}
      {/*                  <img src={`data:${bottle.photoContentType};base64,${bottle.photo}`} style={{ maxHeight: '30px' }} />*/}
      {/*                  &nbsp;*/}
      {/*                </a>*/}
      {/*                <span>*/}
      {/*                    {bottle.photoContentType}, {byteSize(bottle.photo)}*/}
      {/*                  </span>*/}
      {/*              </div>*/}
      {/*            ) : null}*/}
      {/*          </td>*/}
      {/*          <td className="text-right">*/}
      {/*            <div className="btn-group flex-btn-group-container">*/}
      {/*              <Button tag={Link} to={`${match.url}/${bottle.id}`} color="info" size="sm">*/}
      {/*                <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>*/}
      {/*              </Button>*/}
      {/*              <Button*/}
      {/*                tag={Link}*/}
      {/*                to={`${match.url}/${bottle.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}*/}
      {/*                color="primary"*/}
      {/*                size="sm"*/}
      {/*              >*/}
      {/*                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>*/}
      {/*              </Button>*/}
      {/*              <Button*/}
      {/*                tag={Link}*/}
      {/*                to={`${match.url}/${bottle.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}*/}
      {/*                color="danger"*/}
      {/*                size="sm"*/}
      {/*              >*/}
      {/*                <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>*/}
      {/*              </Button>*/}
      {/*            </div>*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      ))}*/}
      {/*      </tbody>*/}
      {/*    </Table>*/}
      {/*  ) : (*/}
      {/*    !loading && <div className="alert alert-warning">No Bottles found</div>*/}
      {/*  )}*/}
      {/*</div>*/}
      <div className={bottleList && bottleList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Col md={{ size: 10, offset:5}}>
            {bottleList.map((bottle, i) => (
              <Card style={{width:"50%", justifyContent: "right"}} key={`entity-${i}`}>
                <CardHeader>{bottle.name}</CardHeader>
                <CardImg width="100%" src="/content/images/jhipster_family_member_0.svg" alt="Card image cap" />
                <CardTitle>{bottle.description}</CardTitle>
                <Button tag={Link} to={`${match.url}/${bottle.id}`} color="info" size="sm">
                  <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                </Button>
              </Card>
            ))}
          </Col>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ bottle }: IRootState) => ({
  bottleList: bottle.entities,
  loading: bottle.loading,
  totalItems: bottle.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
