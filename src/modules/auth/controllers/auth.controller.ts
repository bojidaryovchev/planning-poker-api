import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signUp')
  async signUp(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this._authService.registerAnonymously(res);
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this._authService.issueRefreshToken(req, res);
  }

  @Post('signOut')
  async signOut(@Res() res: Response): Promise<void> {
    await this._authService.logout(res);
  }
}
