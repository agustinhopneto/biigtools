import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Reports from './pages/Reports';
import ScheduleReportsAnalitic from './pages/ScheduleReportsAnalitic';

import Registrations from './pages/Registrations';
import ScheduleGroups from './pages/ScheduleGroups';
import ScheduleCategories from './pages/ScheduleCategories';
import ScheduleProfessionals from './pages/ScheduleProfessionals';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Reports} />
    <Route
      path="/reports/schedule/analitic"
      component={ScheduleReportsAnalitic}
    />
    <Route path="/registrations" exact component={Registrations} />
    <Route path="/schedule/groups" component={ScheduleGroups} />
    <Route path="/schedule/categories" component={ScheduleCategories} />
    <Route path="/schedule/professionals" component={ScheduleProfessionals} />
  </Switch>
);

export default Routes;
