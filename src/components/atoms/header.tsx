import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.themed.minor};
  text-align: center;
  margin-bottom: 0;
`;

const SmallText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
`;

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle && <SmallText>{subtitle}</SmallText>}
    </Wrapper>
  );
}
