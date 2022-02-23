import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import {
    Container,
    Header,
    UserrWrapper,
    UserInfo,
    Photo,
    UserGreating,
    User,
    UserName,
    Icon,
    HighlightCards
} from './styles';

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserrWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https:github.com/marciocamello.png' }} />
                        <User>
                            <UserGreating>Hello</UserGreating>
                            <UserName>Marcio</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserrWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    )
}