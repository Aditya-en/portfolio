// lib/session.ts
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextApiHandler,
} from 'next';

const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string, // Secure secret from env variables, set in .env.local
    cookieName: 'admin-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // Set secure in production
        httpOnly: true, // Recommended for security
        sameSite: 'strict', // Recommended for security
        path: '/',
    },
};

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
    P extends Record<string, unknown> = Record<string, unknown>,
    GP extends GetServerSidePropsResult<P> = GetServerSidePropsResult<P>,
>(
    handler: (
        context: GetServerSidePropsContext,
    ) => GP | Promise<GP>,
) {
    return withIronSessionSsr(handler, sessionOptions);
}

// Augment the session interface to include isAdmin
declare module 'iron-session' {
    interface IronSessionData {
        isAdmin?: boolean;
    }
}

export const getAdminSession = (req: any) => req.session as any; // Helper function to get session