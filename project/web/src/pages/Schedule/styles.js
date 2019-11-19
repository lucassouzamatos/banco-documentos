import styled from 'styled-components';
import {
  ButtonBack as CarouselButtonBack,
  ButtonNext as CarouselButtonNext,
} from 'pure-react-carousel';

export const ButtonContainer = styled.div`
  width: 260px;
  padding: 0 0 20px;
`;

export const ScheduleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const ScheduleItem = styled.div`
  border: 1px solid #e3e3e3;
  border-left: 6px solid ${props => (props.booked ? '#D5D5D5' : '#299f20')};
  color: #95989a;
  padding: 16px 24px;
  margin: 0 0 16px 16px;

  li + li {
    padding-top: 4px;
  }
`;

export const RemoveButton = styled.button`
  background: #292c2f;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 10px;
  margin: 16px 32px 0;
  padding: 4px 40px;
  text-transform: uppercase;
`;

export const ScheduleRequest = styled.div`
  border: 1px solid #e7e7e7;
  color: #95989a;
  padding: 8px;
  margin: 0 8px;
  max-width: 335px;

  p {
    line-height: 1.7;
    padding: 0 0 0 8px;
  }

  img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ContainerFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 16px 0;
`;

export const SliderContainer = styled.div`
  position: relative;
  padding: 0 16px;
`;

export const ButtonBack = styled(CarouselButtonBack)`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translateY(-50%);
`;

export const ButtonNext = styled(CarouselButtonNext)`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
`;
