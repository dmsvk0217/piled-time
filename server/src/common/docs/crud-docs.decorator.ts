import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export interface CrudDocsOptions {
  entityName: string;
  createDto?: any;
  updateDto?: any;
  responseDto?: any;
  paramName?: string;
  paramType?: any;
}

export class CrudDocs {
  static create(options: CrudDocsOptions): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: `${options.entityName} 생성`,
        description: `${options.entityName} 정보를 저장합니다.`,
      }),
      ApiBody({ type: options.createDto }),
      ApiCreatedResponse({
        description: `${options.entityName} 저장 성공`,
        type: options.responseDto,
      })
    );
  }

  static findAll(options: CrudDocsOptions): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: `${options.entityName} 리스트`,
        description: `${options.entityName} 정보 리스트를 조회합니다.`,
      }),
      ApiOkResponse({
        description: `${options.entityName} 리스트 조회 성공`,
        type: options.responseDto,
        isArray: true,
      })
    );
  }

  static findOne(options: CrudDocsOptions): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: `${options.entityName} 상세`,
        description: `${options.entityName} 정보를 조회합니다.`,
      }),
      ApiParam({
        name: options.paramName ?? "id",
        type: options.paramType ?? Number,
        description: `${options.entityName} ID`,
      }),
      ApiOkResponse({
        description: `${options.entityName} 조회 성공`,
        type: options.responseDto,
      })
    );
  }

  static update(options: CrudDocsOptions): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: `${options.entityName} 수정`,
        description: `${options.entityName} 정보를 수정합니다.`,
      }),
      ApiParam({
        name: options.paramName ?? "id",
        type: options.paramType ?? Number,
        description: `${options.entityName} ID`,
      }),
      ApiBody({ type: options.updateDto }),
      ApiOkResponse({
        description: `${options.entityName} 수정 성공`,
        type: options.responseDto,
      })
    );
  }

  static remove(options: CrudDocsOptions): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: `${options.entityName} 삭제`,
        description: `${options.entityName} 정보를 삭제합니다.`,
      }),
      ApiParam({
        name: options.paramName ?? "id",
        type: options.paramType ?? Number,
        description: `${options.entityName} ID`,
      }),
      ApiNoContentResponse({
        description: `${options.entityName} 삭제 성공`,
      })
    );
  }
}
