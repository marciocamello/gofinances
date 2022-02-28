import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>;
    onPress?: () => void;
}

import {
    Container,
    ImageContainer,
    Title
} from './styles';

export function SigninSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props) {
    return (
        <Container {...rest}>
            <ImageContainer>
                <Svg />
            </ImageContainer>

            <Title>
                {title}
            </Title>
        </Container>
    );
}