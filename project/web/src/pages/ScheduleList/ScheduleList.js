import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { useProfile } from '~/hooks';
import { ArtsContainer } from './styles';

import { ArtContainer, Container } from '~/ui';

const ScheduleList = () => {
  const profile = useProfile();
  const [scheduleds, setSchedules] = useState([]);

  useEffect(() => {
    const loadSchedules = async () => {
      const response = await api.get(`scheduleds?customer_id=${profile.id}`);

      setSchedules(response.data.data.scheduleds);
    };

    loadSchedules();
  }, [profile.id]);

  return (
    <Container>
      <ArtsContainer>
        {scheduleds.map(scheduled => (
          <ArtContainer
            as={Link}
            to={`reviews/${scheduled.id}`}
            key={scheduled.id}
          >
            <img
              src={`http://localhost:3333/${scheduled.art.path}`}
              alt={scheduled.art.title}
            />
            <div>
              <h3>{scheduled.art.title}</h3>
              <ul>
                <li>{scheduled.art.dimensions}</li>
                <li>{scheduled.art.price}</li>
              </ul>
            </div>
          </ArtContainer>
        ))}
      </ArtsContainer>
    </Container>
  );
};

export default ScheduleList;
