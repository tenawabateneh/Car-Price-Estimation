import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';


describe('Authentication System E2E Testing Starts Here...', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handles a SIGNUP request', () => {
    const email = "new@new2.com";
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password: "password" })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined()
        expect(email).toEqual(email)
      })
  });
});
