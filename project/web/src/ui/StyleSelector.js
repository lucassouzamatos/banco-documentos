import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { MdClose, MdAdd } from 'react-icons/md';
import api from '~/services/api';
import { useProfile } from '~/hooks';

const StyleSelector = ({ type }) => {
  const profile = useProfile();

  const [styles, setStyles] = useState([]);
  const [userStyles, setUserStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    async function loadStyles() {
      const response = await api.get(`styles`);

      setStyles(response.data.data.styles);
    }

    async function loadUserStyles() {
      const response = await api.get(`${type}?user_id=${profile.id}`);

      const keyName = type === 'artist-styles' ? 'artistStyles' : 'interests';

      setUserStyles(response.data.data[keyName]);
    }

    loadUserStyles();
    loadStyles();
  }, [profile.id, type]);

  const addStyle = async () => {
    if (!selectedStyle) {
      toast.error('Selecione um estilo');
      return;
    }

    const response = await api.post(type, {
      style_id: selectedStyle,
      user_id: profile.id,
    });

    const keyName = type === 'artist-styles' ? 'artistStyles' : 'interests';
    setUserStyles(response.data.data[keyName]);

    toast.success('Estilo adicionado com sucesso');
  };

  const handleRemoveStyle = async userStyle => {
    await api.delete(`${type}/${userStyle.id}`);
    setUserStyles(userStyles.filter(us => us.id !== userStyle.id));

    toast.success('Estilo removido com sucesso');
  };

  return (
    <>
      <StyleTitle>Estilos</StyleTitle>
      <SelectContainer>
        <select
          required
          value={selectedStyle}
          onChange={e => setSelectedStyle(e.target.value)}
        >
          <option>Selecione um estilo</option>
          {styles.map(style => (
            <option key={style.id} value={style.id}>
              {style.title}
            </option>
          ))}
        </select>
        <button type="button" onClick={addStyle}>
          <MdAdd size={20} />
        </button>
      </SelectContainer>

      <StylesContainer>
        {userStyles.map(userStyle => (
          <StyleItem key={userStyle.id}>
            {userStyle.style.title}
            <button type="button" onClick={() => handleRemoveStyle(userStyle)}>
              <MdClose size={14} />
            </button>
          </StyleItem>
        ))}
      </StylesContainer>
    </>
  );
};

const StyleTitle = styled.h3`
  color: #9e9e9e;
  font-size: 12px;
  font-weight: normal;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 8px;
    background: #292c2f;
    color: #fff;
    border: none;
    padding: 2px 4px;
    border-radius: 4px;
  }

  select {
    padding: 8px 0;
  }
`;

const StylesContainer = styled.ul`
  display: flex;
  padding: 8px 0 32px 0;
`;

const StyleItem = styled.li`
  background: #292c2f;
  color: #fff;
  text-transform: uppercase;
  border-radius: 16px;
  font-size: 13px;
  text-align: center;
  padding: 4px 12px;
  display: flex;

  + li {
    margin-left: 8px;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    display: flex;
    margin-left: 8px;
  }
`;

StyleSelector.propTypes = {
  type: PropTypes.string,
};

StyleSelector.defaultProps = {
  type: 'artist-styles',
};

export default StyleSelector;
