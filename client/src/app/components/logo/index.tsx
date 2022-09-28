import React from 'react';
import CarLogoImg from '../../../assets/images/car-logo.png';
import CarLogoDarkImg from '../../../assets/images/car-logo-dark.png';
import styled from 'styled-components';
import tw from 'twin.macro';

interface ILogoProps {
  color?: 'white' | 'dark';
  bgColor?: 'white' | 'dark';
}

const LogoContainer = styled.div`
  ${tw`
    flex 
    items-center
  `}
`;

const LogoText = styled.div`
  ${tw`
    text-xl // mobile devices
    md:text-2xl // tablets and desktops
    font-bold
    text-black
    m-1
  `}
  ${({ color }) => (color === 'white' ? tw`text-white` : tw`text-black`)}
`;

const Image = styled.div`
  width: auto;
  ${tw`
    h-6
    md:h-9
  `}
  img {
    width: auto;
    height: 100%;
  }
`;

export function Logo(props: ILogoProps) {
  const { color, bgColor } = props;

  return (
    <LogoContainer>
      <Image>
        <img src={bgColor === 'dark' ? CarLogoDarkImg : CarLogoImg} />
      </Image>
      <LogoText color={color || 'dark'}>JC-Car.</LogoText>
    </LogoContainer>
  );
}
