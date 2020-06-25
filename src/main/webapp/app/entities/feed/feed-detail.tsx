import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './feed.reducer';
import { addBottle} from "app/entities/my-book/my-book.reducer";
import { IBottleProps } from "app/entities/feed/feed";
import { IBottle } from 'app/shared/model/bottle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBottleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FeedDetail = (props: IBottleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const addToMyBook = (b: IBottle) => () => props.addBottle(b);

  const { bottleEntity, match } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Bottle [<b>{bottleEntity.id}</b>]
          <Button onClick={addToMyBook(bottleEntity)} size ="sm">
            <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add to MyBook</span>
          </Button>

          {/*<Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">*/}
          {/*  <FontAwesomeIcon icon="plus" />*/}
          {/*  &nbsp; Add to MyBook*/}
          {/*</Link>*/}
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{bottleEntity.name}</dd>
          <dt>
            <span id="abv">Abv</span>
          </dt>
          <dd>{bottleEntity.abv}</dd>
          <dt>
            <span id="age">Age</span>
          </dt>
          <dd>{bottleEntity.age}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{bottleEntity.description}</dd>
          <dt>
            <span id="inBottle">In Bottle</span>
          </dt>
          <dd>{bottleEntity.inBottle}</dd>
          <dt>
            <span id="photo">Photo</span>
          </dt>
          <dd>
            {bottleEntity.photo ? (
              <div>
                <a onClick={openFile(bottleEntity.photoContentType, bottleEntity.photo)}>
                  <img src={`data:${bottleEntity.photoContentType};base64,${bottleEntity.photo}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {bottleEntity.photoContentType}, {byteSize(bottleEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Spirit</dt>
          <dd>
            {bottleEntity.spirits
              ? bottleEntity.spirits.map((val, i) => (
                <span key={val.id}>
                    <a>{val.description}</a>
                  {i === bottleEntity.spirits.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Category</dt>
          <dd>
            {bottleEntity.categories
              ? bottleEntity.categories.map((val, i) => (
                <span key={val.id}>
                    <a>{val.description}</a>
                  {i === bottleEntity.categories.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Sub Category</dt>
          <dd>
            {bottleEntity.subCategories
              ? bottleEntity.subCategories.map((val, i) => (
                <span key={val.id}>
                    <a>{val.description}</a>
                  {i === bottleEntity.subCategories.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Primary Barrel</dt>
          <dd>
            {bottleEntity.primaryBarrels
              ? bottleEntity.primaryBarrels.map((val, i) => (
                <span key={val.id}>
                    <a>{val.description}</a>
                  {i === bottleEntity.primaryBarrels.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Secondary Barrel</dt>
          <dd>
            {bottleEntity.secondaryBarrels
              ? bottleEntity.secondaryBarrels.map((val, i) => (
                <span key={val.id}>
                    <a>{val.description}</a>
                  {i === bottleEntity.secondaryBarrels.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Brand</dt>
          <dd>
            {bottleEntity.brands
              ? bottleEntity.brands.map((val, i) => (
                <span key={val.id}>
                    <a>{val.id}</a>
                  {i === bottleEntity.brands.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
          <dt>Distillery</dt>
          <dd>
            {bottleEntity.distilleries
              ? bottleEntity.distilleries.map((val, i) => (
                <span key={val.id}>
                    <a>{val.id}</a>
                  {i === bottleEntity.distilleries.length - 1 ? '' : ', '}
                  </span>
              ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/bottle" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bottle/${bottleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bottle }: IRootState) => ({
  bottleEntity: bottle.entity
});

const mapDispatchToProps = { getEntity, addBottle };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetail);
