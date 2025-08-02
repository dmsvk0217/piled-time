import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController - csrf-token", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    generateCsrfToken: jest.fn(),
    setCsrfTokenCookie: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate and return csrf token, and set it in cookie", () => {
    const fakeToken = "mocked-csrf-token";
    mockAuthService.generateCsrfToken.mockReturnValue(fakeToken);

    const res = mockResponse as unknown as Response;

    const result = controller.getCsrfToken(res);

    expect(mockAuthService.generateCsrfToken).toHaveBeenCalled();
    expect(mockAuthService.setCsrfTokenCookie).toHaveBeenCalledWith(res, fakeToken);
    expect(result).toEqual({ csrfToken: fakeToken });
  });
});
