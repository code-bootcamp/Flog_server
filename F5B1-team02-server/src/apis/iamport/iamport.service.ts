import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class IamportService {
  constructor(private readonly connection: Connection) {}
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.status,
        error.response.data.message,
      );
    }
  }

  async checkPaid({ impUid, amount, token }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: token },
        },
      );
      if (result.data.response.status !== 'paid')
        throw new ConflictException('결제 이력이 없습니다.');
      if (result.data.response.amount !== amount)
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.status,
          error.response.data.message,
        );
      } else {
        throw error;
      }
    }
  }
  async cancelPaid({ impUid, token }) {
    try {
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel', //
        { imp_uid: impUid },
        { headers: { Authorization: token } },
      );
      return result.data.response.cancel_amount;
    } catch (error) {}
  }
}
