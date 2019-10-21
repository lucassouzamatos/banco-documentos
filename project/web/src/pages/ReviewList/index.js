import React from 'react';

import { MdThumbUp } from 'react-icons/md';
import { ArtsContainer, LikeButton } from './styles';
import { ArtContainer } from '~/components/Styled/Art';

export default function ReviewList() {
  return (
    <ArtsContainer>
      {[0, 1, 2, 3].map(item => (
        <ArtContainer key={item}>
          <img
            src="https://www.tattooja.com.br/img/blog/tatuagem-nos-dedos-saiba-tudo-que-precisa-ideias-inspiradoras-para-tattoo-topo-1720742430.jpg"
            alt=""
          />
          <div>
            <h3>Título</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus adipisci vel, autem provident, molestiae ad atque
              asperiores saepe assumenda error debitis optio totam earum aperiam
              molestias blanditiis doloremque quas. Dicta?
            </p>
            <LikeButton type="button">
              <MdThumbUp size={21} />
              129 likes
            </LikeButton>
          </div>
        </ArtContainer>
      ))}
    </ArtsContainer>
  );
}
