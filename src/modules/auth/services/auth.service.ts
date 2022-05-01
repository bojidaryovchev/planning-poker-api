import * as Iron from '@hapi/iron';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken, User } from '@prisma/client';
import { CookieSerializeOptions, serialize } from 'cookie';
import { CookieOptions, Request, Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import {
  ACCESS_TOKEN_LIFESPAN,
  REFRESH_TOKEN_COOKIE_IDENTIFIER,
  REFRESH_TOKEN_COOKIE_LIFESPAN,
  REFRESH_TOKEN_LIFESPAN,
} from '../constants/auth.constants';
import { AccessTokenPayload } from '../interfaces/accessTokenPayload.interface';
import { RefreshTokenSealPayload } from '../interfaces/refreshTokenSealPayload.interface';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService) {}

  async registerAnonymously(res: Response): Promise<void> {
    const user: User = await this._prismaService.user.create({
      data: {},
    });
    const sealedUserId: string = await Iron.seal(user.id, process.env.USER_ID_SEAL_SECRET, Iron.defaults);

    this._setCookies(res, [await this._createRefreshTokenCookie(sealedUserId)]);

    const accessTokenPayload: AccessTokenPayload = {
      accessToken: this._signAccessTokenJwt(sealedUserId),
    };

    res.send(accessTokenPayload);
  }

  async issueRefreshToken(req: Request, res: Response): Promise<void> {
    const refreshTokenCookie: string = req.cookies[this._refreshTokenCookieIdentifier];

    if (!refreshTokenCookie) {
      throw new UnauthorizedException();
    }

    const { refreshToken }: RefreshTokenSealPayload = await this._unsealRefreshToken(refreshTokenCookie);

    try {
      const existingSession: RefreshToken = await this._prismaService.refreshToken.findUnique({
        where: {
          refreshToken: refreshTokenCookie,
        },
      });

      if (existingSession) {
        throw new UnauthorizedException();
      }

      // verify would throw an error if anything is wrong with the jwt
      const { sub: sealedUserId } = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;

      await this._prismaService.refreshToken.create({
        data: {
          refreshToken: refreshTokenCookie,
        },
      });

      this._setCookies(res, [await this._createRefreshTokenCookie(sealedUserId)]);

      const accessTokenPayload: AccessTokenPayload = {
        accessToken: this._signAccessTokenJwt(sealedUserId),
      };

      res.send(accessTokenPayload);
    } catch (err) {
      res.clearCookie(this._refreshTokenCookieIdentifier);
      throw new UnauthorizedException();
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    const refreshTokenCookie: string = req.cookies[this._refreshTokenCookieIdentifier];

    if (!refreshTokenCookie) {
      return;
    }

    await this._prismaService.refreshToken.create({
      data: {
        refreshToken: refreshTokenCookie,
      },
    });

    res.clearCookie(this._refreshTokenCookieIdentifier);
  }

  private get _refreshTokenCookieIdentifier(): string {
    const production: boolean = process.env.NODE_ENV === 'production';
    const refreshTokenCookieIdentifier: string = `${production ? '__Host-' : ''}${REFRESH_TOKEN_COOKIE_IDENTIFIER}`;

    return refreshTokenCookieIdentifier;
  }

  private _setCookies(res: Response, cookies: string[]): void {
    res.setHeader('Set-Cookie', cookies.join(';'));
  }

  // the __Host prefix requires that the cookie has path=/, secure=true and no domain attribute
  private _createHostCookie(name: string, value: string, options?: Omit<CookieSerializeOptions, 'domain'>): string {
    return serialize(`__Host-${name}`, value, {
      ...options,
      secure: true,
    });
  }

  private async _createRefreshTokenCookie(userId: string): Promise<string> {
    const refreshToken: string = this._signRefreshTokenJwt(userId);
    const refreshTokenSeal: string = await this._sealRefreshToken(refreshToken);
    const refreshTokenCookieOptions: CookieOptions = {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_COOKIE_LIFESPAN,
    };

    if (process.env.NODE_ENV !== 'production') {
      return serialize(REFRESH_TOKEN_COOKIE_IDENTIFIER, refreshTokenSeal, refreshTokenCookieOptions);
    }

    return this._createHostCookie(REFRESH_TOKEN_COOKIE_IDENTIFIER, refreshTokenSeal, refreshTokenCookieOptions);
  }

  private _signAccessTokenJwt(userId: string): string {
    return sign({}, process.env.ACCESS_TOKEN_SECRET, {
      subject: userId,
      expiresIn: ACCESS_TOKEN_LIFESPAN,
    });
  }

  private _signRefreshTokenJwt(userId: string): string {
    return sign({}, process.env.REFRESH_TOKEN_SECRET, {
      subject: userId,
      expiresIn: REFRESH_TOKEN_LIFESPAN,
    });
  }

  private async _sealRefreshToken(refreshToken: string): Promise<string> {
    const refreshTokenSealPayload: RefreshTokenSealPayload = {
      refreshToken,
    };

    return await Iron.seal(refreshTokenSealPayload, process.env.REFRESH_TOKEN_SEAL_SECRET, Iron.defaults);
  }

  private async _unsealRefreshToken(refreshTokenSeal: string): Promise<RefreshTokenSealPayload> {
    return await Iron.unseal(refreshTokenSeal, process.env.REFRESH_TOKEN_SEAL_SECRET, Iron.defaults);
  }
}
