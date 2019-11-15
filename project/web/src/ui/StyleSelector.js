import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';

const StyleSelector = () => {
  const profile = useSelector(state => state.user.profile);

  const [styles, setStyles] = useState([]);
  const [userStyles, setUserStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    async function loadStyles() {
      const response = await api.get(`styles`);

      setStyles(response.data.data.styles);
    }

    async function loadUserStyles() {
      const response = await api.get(`artist-styles?user_id=${profile.id}`);

      setUserStyles(response.data.data.artistStyles);
    }

    loadUserStyles();
    loadStyles();
  }, [profile.id]);

  const addStyle = async () => {
    const response = await api.post(`artist-styles`, {
      style_id: selectedStyle,
      user_id: profile.id,
    });

    console.log(response.data.data.artistStyle);

    // setUserStyles([...userStyles, response.data.data.artistStyle]);

    toast.success('Estilo adicionado com sucesso');
  };

  const handleRemoveStyle = async userStyle => {
    await api.delete(`artist-styles/${userStyle.id}`);
    setUserStyles(userStyles.filter(us => us.id !== userStyle.id));

    toast.success('Estilo removido com sucesso');
  };

  return (
    <>
      <ul>
        {userStyles.map(userStyle => (
          <li key={userStyle.id}>
            {userStyle.style.title}
            <button type="button" onClick={() => handleRemoveStyle(userStyle)}>
              X
            </button>
          </li>
        ))}
      </ul>

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
        add
      </button>
    </>
  );
};

export default StyleSelector;
