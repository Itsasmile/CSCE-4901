/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as PostImport } from './routes/post'
import { Route as LoginImport } from './routes/login'
import { Route as ChangeProfileImport } from './routes/change-profile'
import { Route as ChangeNameImport } from './routes/change-name'
import { Route as IndexImport } from './routes/index'
import { Route as GameGameIdImport } from './routes/game/$gameId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const PostRoute = PostImport.update({
  id: '/post',
  path: '/post',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ChangeProfileRoute = ChangeProfileImport.update({
  id: '/change-profile',
  path: '/change-profile',
  getParentRoute: () => rootRoute,
} as any)

const ChangeNameRoute = ChangeNameImport.update({
  id: '/change-name',
  path: '/change-name',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GameGameIdRoute = GameGameIdImport.update({
  id: '/game/$gameId',
  path: '/game/$gameId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/change-name': {
      id: '/change-name'
      path: '/change-name'
      fullPath: '/change-name'
      preLoaderRoute: typeof ChangeNameImport
      parentRoute: typeof rootRoute
    }
    '/change-profile': {
      id: '/change-profile'
      path: '/change-profile'
      fullPath: '/change-profile'
      preLoaderRoute: typeof ChangeProfileImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/post': {
      id: '/post'
      path: '/post'
      fullPath: '/post'
      preLoaderRoute: typeof PostImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/game/$gameId': {
      id: '/game/$gameId'
      path: '/game/$gameId'
      fullPath: '/game/$gameId'
      preLoaderRoute: typeof GameGameIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/change-name': typeof ChangeNameRoute
  '/change-profile': typeof ChangeProfileRoute
  '/login': typeof LoginRoute
  '/post': typeof PostRoute
  '/register': typeof RegisterRoute
  '/game/$gameId': typeof GameGameIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/change-name': typeof ChangeNameRoute
  '/change-profile': typeof ChangeProfileRoute
  '/login': typeof LoginRoute
  '/post': typeof PostRoute
  '/register': typeof RegisterRoute
  '/game/$gameId': typeof GameGameIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/change-name': typeof ChangeNameRoute
  '/change-profile': typeof ChangeProfileRoute
  '/login': typeof LoginRoute
  '/post': typeof PostRoute
  '/register': typeof RegisterRoute
  '/game/$gameId': typeof GameGameIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/change-name'
    | '/change-profile'
    | '/login'
    | '/post'
    | '/register'
    | '/game/$gameId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/change-name'
    | '/change-profile'
    | '/login'
    | '/post'
    | '/register'
    | '/game/$gameId'
  id:
    | '__root__'
    | '/'
    | '/change-name'
    | '/change-profile'
    | '/login'
    | '/post'
    | '/register'
    | '/game/$gameId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChangeNameRoute: typeof ChangeNameRoute
  ChangeProfileRoute: typeof ChangeProfileRoute
  LoginRoute: typeof LoginRoute
  PostRoute: typeof PostRoute
  RegisterRoute: typeof RegisterRoute
  GameGameIdRoute: typeof GameGameIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChangeNameRoute: ChangeNameRoute,
  ChangeProfileRoute: ChangeProfileRoute,
  LoginRoute: LoginRoute,
  PostRoute: PostRoute,
  RegisterRoute: RegisterRoute,
  GameGameIdRoute: GameGameIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/change-name",
        "/change-profile",
        "/login",
        "/post",
        "/register",
        "/game/$gameId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/change-name": {
      "filePath": "change-name.tsx"
    },
    "/change-profile": {
      "filePath": "change-profile.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/post": {
      "filePath": "post.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/game/$gameId": {
      "filePath": "game/$gameId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */