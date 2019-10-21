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

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/edit" component={ProfileEdit} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/artists" component={ArtistList} isPrivate />
      <Route path="/arts/new" component={ArtRegister} isPrivate />
      <Route path="/arts" component={ArtList} isPrivate />
      <Route path="/artist/:id" component={ArtistProfile} isPrivate />
    </Switch>
  );
}
