import React, { useEffect } from 'react';
import api from '~/services/api';
import { useProfile } from '~/hooks';

const ScheduleList = () => {
  const profile = useProfile();

  useEffect(() => {
    const loadSchedules = async () => {
      await api.get(`scheduleds?customer_id=${profile.id}`);
    };

    loadSchedules();
  }, [profile.id]);

  return <h1>List</h1>;
};

export default ScheduleList;
