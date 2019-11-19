import styled from 'styled-components';

const DefinitionList = styled.dl`
  dt {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: normal;
  }

  dd {
    font-size: 20px;
    font-weight: 300;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
  }
`;

export default DefinitionList;
