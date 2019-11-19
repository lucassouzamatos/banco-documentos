import React, { useEffect, useState } from 'react';

import { MdThumbUp } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ArtsContainer, LikeButton } from './styles';
import { ArtContainer, Container, Title } from '~/ui';
import api, { host } from '~/services/api';
import { useProfile } from '~/hooks';

const Explore = () => {
  const [reviews, setReviews] = useState([]);
  const profile = useProfile();

  useEffect(() => {
    const loadArts = async () => {
      const response = await api.get(`reviews`);

      setReviews(response.data.data.reviews);
    };

    loadArts();
  }, []);

  const handleLikeReview = async review => {
    try {
      if (review.__meta__.liked === '0') {
        await api.post('likes', {
          user_id: profile.id,
          review_id: review.id,
        });

        const loadArts = async () => {
          const response = await api.get(`reviews`);

          setReviews(response.data.data.reviews);
        };

        loadArts();
      }
    } catch (error) {
      toast.error('Erro ao curtir review');
    }
  };

  return (
    <Container>
      <Title>Explorar</Title>

      <ArtsContainer>
        {reviews.map(review => (
          <ArtContainer key={review.id}>
            <img src={`${host}/${review.path}`} alt="" />
            <div>
              <h3>{review.title}</h3>
              <p>{review.description}</p>
              <LikeButton
                type="button"
                onClick={() => handleLikeReview(review)}
              >
                <MdThumbUp size={21} />
                {review.__meta__.likes_count} likes
              </LikeButton>
            </div>
          </ArtContainer>
        ))}
      </ArtsContainer>
    </Container>
  );
};

export default Explore;
