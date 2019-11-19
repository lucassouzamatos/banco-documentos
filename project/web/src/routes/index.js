import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import HomeClient from '../pages/HomeClient';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Register from '../pages/Register';
import ArtistList from '../pages/ArtistList';
import ArtList from '../pages/ArtList';
import ArtRegister from '../pages/ArtRegister';
import ArtistProfile from '../pages/ArtistProfile';
import ReviewRegister from '../pages/ReviewRegister';
import Explore from '../pages/Explore';
import Schedule from '../pages/Schedule';
import Notifications from '../pages/Notifications';
import ScheduleList from '../pages/ScheduleList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home" component={HomeClient} isPrivate />
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
      <Route path="/explore" component={Explore} isPrivate />
      <Route path="/schedule" component={Schedule} isPrivate />
      <Route path="/notifications" component={Notifications} isPrivate />
      <Route path="/schedule-list" component={ScheduleList} isPrivate />
    </Switch>
  );
}
