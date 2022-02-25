import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles';

type Category = typeof categories[number];

interface Props extends Category {
    category: string;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {
    return (
        <Container>
            <Header>
                <Title>Category</Title>
            </Header>

            <FlatList
                data={categories}
                style={{
                    flex: 1,
                    width: '100%',
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title='Select'
                />
            </Footer>

        </Container>
    );
}