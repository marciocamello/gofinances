import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';

// Ativa o uso do fetch mock
fetchMock.enableMocks();

// Define uma resposta padrão para o response do fetch
fetchMock.mockResponse(
    JSON.stringify({
        id: 'test-id',
        given_name: 'John Doe',
        email: 'any@email.com',
        picture: 'any.png',
    }),
);

// Mock Auth Session do expo-auth-session
jest.mock('expo-auth-session', () => ({
    startAsync: () => ({
        type: 'success',
        params: { access_token: 'test-token' },
    }),
}));

describe('Auth Hook', () => {

    it('should be able to sign in with google', async () => {

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(async () => {
            await result.current.signWithInGoogle();
        });

        expect(result.current.user.email)
            .toBe('any@email.com');
    });
});