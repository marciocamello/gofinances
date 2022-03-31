import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-auth-session');

fetchMock.enableMocks();

describe('Auth Hook', () => {

    beforeEach(async () => {
        const userCollectionKey = '@gofinances:users'
        await AsyncStorage.removeItem(userCollectionKey)
    });

    it('should be able to sign in with google', async () => {

        const googleMocked = mocked(startAsync as any);

        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: { access_token: 'any-token' },
        });

        fetchMock.mockResponseOnce(
            JSON.stringify({
                id: 'any-id',
                given_name: 'John Doe',
                email: 'any@email.com',
                picture: 'any.png',
            }),
        );

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(async () => {
            await result.current.signWithInGoogle();
        });

        expect(result.current.user.email)
            .toBe('any@email.com');
    });

    it('user should not connect if cancel authentication with google', async () => {

        const googleMocked = mocked(startAsync as any);

        googleMocked.mockReturnValueOnce({
            type: 'cancel'
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(async () => {
            await result.current.signWithInGoogle();
        });

        expect(result.current.user).not.toHaveProperty('id');
    });
});