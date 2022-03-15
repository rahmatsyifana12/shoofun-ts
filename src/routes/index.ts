import { Router } from 'express';
import usersRoute from './user.route';
import productsRoute from './product.route';

type CommonRoute = {
    /** the current routing version (starts at 1) */
    version: number,
    /** the endpoint path name (don't start with '/') */
    path: string,
    /** the router for this specific endpoint */
    router: Router
};

// All of the routes you've created within the 'routes' folder
// must be registered here, and it'll bind it to the server.
const allRoutes: CommonRoute[] = [
    {
        version: 1,
        path: 'users',
        router: usersRoute
    },
    {
        version: 1,
        path: 'products',
        router: productsRoute
    }
];

// Insert all routes to the 'global' router
//
// Automatically combine all router into this
// 'global' route, then bind it to the server.
//
// In the end, it'll produce like: /v1/todo/add
const globalRouter = Router();
for (const route of allRoutes) {
    const { version, path, router } = route;
    globalRouter.use(`/v${version}/${path}`, router);
}

export default globalRouter;