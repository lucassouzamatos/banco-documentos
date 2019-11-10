import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Register from '../pages/Register';
import ArtistList from '../pages/ArtistList';
import ArtList from '../pages/ArtList';
import ArtRegister from '../pages/ArtRegister';
import ArtistProfile from '../pages/ArtistProfile';
import ReviewRegister from '../pages/ReviewRegister';
import ReviewList from '../pages/ReviewList';
import Schedule from '../pages/Schedule';
import Notifications from '../pages/Notifications';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/edit" component={ProfileEdit} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/artists" component={ArtistList} isPrivate />
      <Route path="/arts/new/:id" component={ArtRegister} isPrivate />
      <Route path="/arts/new" component={ArtRegister} isPrivate />
      <Route path="/arts" component={ArtList} isPrivate />
      <Route path="/artist/:id" component={ArtistProfile} isPrivate />
      <Route path="/reviews/:id" component={ReviewRegister} isPrivate />
      <Route path="/reviews" component={ReviewList} isPrivate />
      <Route path="/schedule" component={Schedule} isPrivate />
      <Route path="/notifications" component={Notifications} isPrivate />
    </Switch>
  );
}
