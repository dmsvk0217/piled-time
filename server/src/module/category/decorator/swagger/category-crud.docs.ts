import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from "src/module/category/dto";

const entityName = "카테고리";

export const CategoryDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: CategoryCreateRequest,
    responseDto: CategoryResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: CategoryResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: CategoryResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: CategoryUpdateRequest,
    responseDto: CategoryResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
