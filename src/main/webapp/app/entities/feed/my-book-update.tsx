import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Card, CardTitle } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserHistory } from 'app/shared/model/user-history.model';
import { getEntities as getUserHistories } from 'app/entities/user-history/user-history.reducer';
import { IFavorite } from 'app/shared/model/favorite.model';
import { getEntities as getFavorites } from 'app/entities/favorite/favorite.reducer';
import { IBottle } from 'app/shared/model/bottle.model';
import { getEntities as getBottles, getEntity as getBottle } from './feed.reducer';
import { getEntity, updateEntity, createEntity, reset, getEntityForCurrentUser } from '../my-book/my-book.reducer';
import { IMyBook } from 'app/shared/model/my-book.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMyBookUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MyBookUpdate = (props: IMyBookUpdateProps) => {
  const [idsfavorite, setIdsfavorite] = useState([]);
  const [idsbottle, setIdsbottle] = useState([]);
  const [userHistoryId, setUserHistoryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { myBookEntity, userHistories, favorites, bottles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/my-book' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntityForCurrentUser();
    }

    props.getUserHistories();
    props.getFavorites();
    // props.getBottles();
    // props.getBottleEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...myBookEntity,
        ...values,
        // ...bottleEntity,
        favorites: mapIdList(values.favorites),
        bottles: mapIdList(values.bottles)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="backendApp.myBook.home.createOrEditLabel">Create or edit a MyBook</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : myBookEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="my-book-id">ID</Label>
                  <AvInput id="my-book-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="ratingLabel" for="my-book-rating">
                  Rating
                </Label>
                <AvInput
                  id="my-book-rating"
                  type="select"
                  className="form-control"
                  name="rating"
                  value={(!isNew && myBookEntity.rating) || 'BAD'}
                >
                  <option value="BAD">BAD</option>
                  <option value="OKAY">OKAY</option>
                  <option value="GOOD">GOOD</option>
                  <option value="GREAT">GREAT</option>
                  <option value="BEST">BEST</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="my-book-userHistory">User History</Label>
                <AvInput id="my-book-userHistory" type="select" className="form-control" name="userHistory.id">
                  <option value="" key="0" />
                  {userHistories
                    ? userHistories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="my-book-favorite">Favorite</Label>
                <AvInput
                  id="my-book-favorite"
                  type="select"
                  multiple
                  className="form-control"
                  name="favorites"
                  value={myBookEntity.favorites && myBookEntity.favorites.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {favorites
                    ? favorites.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="my-book-bottle">Bottle</Label>
                <AvInput
                  id="my-book-bottle"
                  type="select"
                  multiple
                  className="form-control"
                  name="bottles"
                  value={myBookEntity.bottles && myBookEntity.bottles.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {bottles
                    ? bottles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              {/*<dl className="bottle-details">*/}
              {/*  <dt>*/}
              {/*    <span id="name">Name</span>*/}
              {/*  </dt>*/}
              {/*  <dd>{bottleEntity.name}</dd>*/}
              {/*</dl>*/}
              <Button tag={Link} id="cancel-save" to="/my-book" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  userHistories: storeState.userHistory.entities,
  favorites: storeState.favorite.entities,
  bottles: storeState.bottle.entities,
  bottleEntity: storeState.bottle.entity,
  myBookEntity: storeState.myBook.entity,
  loading: storeState.myBook.loading,
  updating: storeState.myBook.updating,
  updateSuccess: storeState.myBook.updateSuccess
});

const mapDispatchToProps = {
  getUserHistories,
  getFavorites,
  getBottles,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getEntityForCurrentUser,
  // getBottleEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MyBookUpdate);
