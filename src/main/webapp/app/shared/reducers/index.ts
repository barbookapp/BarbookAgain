import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import bottle, {
  BottleState
} from 'app/entities/bottle/bottle.reducer';
// prettier-ignore
import spirit, {
  SpiritState
} from 'app/entities/spirit/spirit.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import subCategory, {
  SubCategoryState
} from 'app/entities/sub-category/sub-category.reducer';
// prettier-ignore
import primaryBarrel, {
  PrimaryBarrelState
} from 'app/entities/primary-barrel/primary-barrel.reducer';
// prettier-ignore
import secondaryBarrel, {
  SecondaryBarrelState
} from 'app/entities/secondary-barrel/secondary-barrel.reducer';
// prettier-ignore
import distillery, {
  DistilleryState
} from 'app/entities/distillery/distillery.reducer';
// prettier-ignore
import brand, {
  BrandState
} from 'app/entities/brand/brand.reducer';
// prettier-ignore
import parent, {
  ParentState
} from 'app/entities/parent/parent.reducer';
// prettier-ignore
import userHistory, {
  UserHistoryState
} from 'app/entities/user-history/user-history.reducer';
// prettier-ignore
import myBook, {
  MyBookState
} from 'app/entities/my-book/my-book.reducer';
// prettier-ignore
import favorite, {
  FavoriteState
} from 'app/entities/favorite/favorite.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly bottle: BottleState;
  readonly spirit: SpiritState;
  readonly category: CategoryState;
  readonly subCategory: SubCategoryState;
  readonly primaryBarrel: PrimaryBarrelState;
  readonly secondaryBarrel: SecondaryBarrelState;
  readonly distillery: DistilleryState;
  readonly brand: BrandState;
  readonly parent: ParentState;
  readonly userHistory: UserHistoryState;
  readonly myBook: MyBookState;
  readonly favorite: FavoriteState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  bottle,
  spirit,
  category,
  subCategory,
  primaryBarrel,
  secondaryBarrel,
  distillery,
  brand,
  parent,
  userHistory,
  myBook,
  favorite,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
