import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import {
  MemoCreateRequest,
  MemoResponse,
  MemoUpdateRequest,
} from "src/module/memo/dto";

const entityName = "메모";

export const MemoDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: MemoCreateRequest,
    responseDto: MemoResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: MemoResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: MemoResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: MemoUpdateRequest,
    responseDto: MemoResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
