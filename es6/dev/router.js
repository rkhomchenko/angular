/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
export { Router } from './src/router/router';
export { RouterOutlet } from './src/router/router_outlet';
export { RouterLink } from './src/router/router_link';
export { RouteParams, RouteData } from './src/router/instruction';
export { RouteRegistry } from './src/router/route_registry';
export { PlatformLocation } from './src/router/platform_location';
export { LocationStrategy, APP_BASE_HREF } from './src/router/location_strategy';
export { HashLocationStrategy } from './src/router/hash_location_strategy';
export { PathLocationStrategy } from './src/router/path_location_strategy';
export { Location } from './src/router/location';
export * from './src/router/route_config_decorator';
export * from './src/router/route_definition';
export { CanActivate } from './src/router/lifecycle_annotations';
export { Instruction, ComponentInstruction } from './src/router/instruction';
export { OpaqueToken } from 'angular2/core';
import { PlatformLocation } from './src/router/platform_location';
import { LocationStrategy } from './src/router/location_strategy';
import { PathLocationStrategy } from './src/router/path_location_strategy';
import { Router, RootRouter } from './src/router/router';
import { RouterOutlet } from './src/router/router_outlet';
import { RouterLink } from './src/router/router_link';
import { RouteRegistry } from './src/router/route_registry';
import { Location } from './src/router/location';
import { ApplicationRef, OpaqueToken, Provider } from 'angular2/core';
import { CONST_EXPR } from './src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
/**
 * Token used to bind the component with the top-level {@link RouteConfig}s for the
 * application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component} from 'angular2/angular2';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_PROVIDERS,
 *   RouteConfig
 * } from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
export const ROUTER_PRIMARY_COMPONENT = CONST_EXPR(new OpaqueToken('RouterPrimaryComponent'));
/**
 * A list of directives. To use the router directives like {@link RouterOutlet} and
 * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
 * component.
 *
 * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component} from 'angular2/angular2';
 * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *    // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
export const ROUTER_DIRECTIVES = CONST_EXPR([RouterOutlet, RouterLink]);
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component} from 'angular2/angular2';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_PROVIDERS,
 *   RouteConfig
 * } from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
export const ROUTER_PROVIDERS = CONST_EXPR([
    RouteRegistry,
    CONST_EXPR(new Provider(LocationStrategy, { useClass: PathLocationStrategy })),
    PlatformLocation,
    Location,
    CONST_EXPR(new Provider(Router, {
        useFactory: routerFactory,
        deps: CONST_EXPR([RouteRegistry, Location, ROUTER_PRIMARY_COMPONENT, ApplicationRef])
    })),
    CONST_EXPR(new Provider(ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: CONST_EXPR([ApplicationRef]) }))
]);
/**
 * @deprecated
 */
export const ROUTER_BINDINGS = ROUTER_PROVIDERS;
function routerFactory(registry, location, primaryComponent, appRef) {
    var rootRouter = new RootRouter(registry, location, primaryComponent);
    appRef.registerDisposeListener(() => rootRouter.dispose());
    return rootRouter;
}
function routerPrimaryComponentFactory(app) {
    if (app.componentTypes.length == 0) {
        throw new BaseException("Bootstrap at least one component before injecting Router.");
    }
    return app.componentTypes[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvcm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlckZhY3RvcnkiLCJyb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILFNBQVEsTUFBTSxRQUFPLHFCQUFxQixDQUFDO0FBQzNDLFNBQVEsWUFBWSxRQUFPLDRCQUE0QixDQUFDO0FBQ3hELFNBQVEsVUFBVSxRQUFPLDBCQUEwQixDQUFDO0FBQ3BELFNBQVEsV0FBVyxFQUFFLFNBQVMsUUFBTywwQkFBMEIsQ0FBQztBQUNoRSxTQUFRLGFBQWEsUUFBTyw2QkFBNkIsQ0FBQztBQUMxRCxTQUFRLGdCQUFnQixRQUFPLGdDQUFnQyxDQUFDO0FBQ2hFLFNBQVEsZ0JBQWdCLEVBQUUsYUFBYSxRQUFPLGdDQUFnQyxDQUFDO0FBQy9FLFNBQVEsb0JBQW9CLFFBQU8scUNBQXFDLENBQUM7QUFDekUsU0FBUSxvQkFBb0IsUUFBTyxxQ0FBcUMsQ0FBQztBQUN6RSxTQUFRLFFBQVEsUUFBTyx1QkFBdUIsQ0FBQztBQUMvQyxjQUFjLHFDQUFxQyxDQUFDO0FBQ3BELGNBQWMsK0JBQStCLENBQUM7QUFFOUMsU0FBUSxXQUFXLFFBQU8sb0NBQW9DLENBQUM7QUFDL0QsU0FBUSxXQUFXLEVBQUUsb0JBQW9CLFFBQU8sMEJBQTBCLENBQUM7QUFDM0UsU0FBUSxXQUFXLFFBQU8sZUFBZSxDQUFDO09BRW5DLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDeEQsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztPQUN4RCxFQUFDLG9CQUFvQixFQUFDLE1BQU0scUNBQXFDO09BQ2pFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLHFCQUFxQjtPQUMvQyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QjtPQUNoRCxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQjtPQUM1QyxFQUFDLGFBQWEsRUFBQyxNQUFNLDZCQUE2QjtPQUNsRCxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QjtPQUN2QyxFQUFDLGNBQWMsRUFBVyxXQUFXLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZTtPQUNyRSxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQjtPQUNyQyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztBQUc1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsYUFBYSx3QkFBd0IsR0FDakMsVUFBVSxDQUFDLElBQUksV0FBVyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsYUFBYSxpQkFBaUIsR0FBVSxVQUFVLENBQUMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxhQUFhLGdCQUFnQixHQUFVLFVBQVUsQ0FBQztJQUNoRCxhQUFhO0lBQ2IsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQztJQUM1RSxnQkFBZ0I7SUFDaEIsUUFBUTtJQUNSLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FDbkIsTUFBTSxFQUNOO1FBQ0UsVUFBVSxFQUFFLGFBQWE7UUFDekIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDdEYsQ0FBQyxDQUFDO0lBQ1AsVUFBVSxDQUFDLElBQUksUUFBUSxDQUNuQix3QkFBd0IsRUFDeEIsRUFBQyxVQUFVLEVBQUUsNkJBQTZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0NBQ3RGLENBQUMsQ0FBQztBQUVIOztHQUVHO0FBQ0gsYUFBYSxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7QUFFaEQsdUJBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTTtJQUNqRUEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsVUFBVUEsQ0FBQ0EsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsZ0JBQWdCQSxDQUFDQSxDQUFDQTtJQUN0RUEsTUFBTUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxNQUFNQSxVQUFVQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUMzREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7QUFDcEJBLENBQUNBO0FBRUQsdUNBQXVDLEdBQUc7SUFDeENDLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ25DQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSwyREFBMkRBLENBQUNBLENBQUNBO0lBQ3ZGQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUMvQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogTWFwcyBhcHBsaWNhdGlvbiBVUkxzIGludG8gYXBwbGljYXRpb24gc3RhdGVzLCB0byBzdXBwb3J0IGRlZXAtbGlua2luZyBhbmQgbmF2aWdhdGlvbi5cbiAqL1xuXG5leHBvcnQge1JvdXRlcn0gZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlcic7XG5leHBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlcl9vdXRsZXQnO1xuZXhwb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVyX2xpbmsnO1xuZXhwb3J0IHtSb3V0ZVBhcmFtcywgUm91dGVEYXRhfSBmcm9tICcuL3NyYy9yb3V0ZXIvaW5zdHJ1Y3Rpb24nO1xuZXhwb3J0IHtSb3V0ZVJlZ2lzdHJ5fSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVfcmVnaXN0cnknO1xuZXhwb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3NyYy9yb3V0ZXIvcGxhdGZvcm1fbG9jYXRpb24nO1xuZXhwb3J0IHtMb2NhdGlvblN0cmF0ZWd5LCBBUFBfQkFTRV9IUkVGfSBmcm9tICcuL3NyYy9yb3V0ZXIvbG9jYXRpb25fc3RyYXRlZ3knO1xuZXhwb3J0IHtIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnLi9zcmMvcm91dGVyL2hhc2hfbG9jYXRpb25fc3RyYXRlZ3knO1xuZXhwb3J0IHtQYXRoTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnLi9zcmMvcm91dGVyL3BhdGhfbG9jYXRpb25fc3RyYXRlZ3knO1xuZXhwb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi9zcmMvcm91dGVyL2xvY2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZV9jb25maWdfZGVjb3JhdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZV9kZWZpbml0aW9uJztcbmV4cG9ydCB7T25BY3RpdmF0ZSwgT25EZWFjdGl2YXRlLCBPblJldXNlLCBDYW5EZWFjdGl2YXRlLCBDYW5SZXVzZX0gZnJvbSAnLi9zcmMvcm91dGVyL2ludGVyZmFjZXMnO1xuZXhwb3J0IHtDYW5BY3RpdmF0ZX0gZnJvbSAnLi9zcmMvcm91dGVyL2xpZmVjeWNsZV9hbm5vdGF0aW9ucyc7XG5leHBvcnQge0luc3RydWN0aW9uLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi9zcmMvcm91dGVyL2luc3RydWN0aW9uJztcbmV4cG9ydCB7T3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vc3JjL3JvdXRlci9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge1BhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICcuL3NyYy9yb3V0ZXIvcGF0aF9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge1JvdXRlciwgUm9vdFJvdXRlcn0gZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVyX2xpbmsnO1xuaW1wb3J0IHtSb3V0ZVJlZ2lzdHJ5fSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVfcmVnaXN0cnknO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi9zcmMvcm91dGVyL2xvY2F0aW9uJztcbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIHByb3ZpZGUsIE9wYXF1ZVRva2VuLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJy4vc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuXG4vKipcbiAqIFRva2VuIHVzZWQgdG8gYmluZCB0aGUgY29tcG9uZW50IHdpdGggdGhlIHRvcC1sZXZlbCB7QGxpbmsgUm91dGVDb25maWd9cyBmb3IgdGhlXG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvaVJVUDhCNU9VYnhDV1EzQWNJRG0pKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2FuZ3VsYXIyJztcbiAqIGltcG9ydCB7XG4gKiAgIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICogICBST1VURVJfUFJPVklERVJTLFxuICogICBSb3V0ZUNvbmZpZ1xuICogfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAvLyAuLi5cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwQ21wLCBbUk9VVEVSX1BST1ZJREVSU10pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBST1VURVJfUFJJTUFSWV9DT01QT05FTlQ6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignUm91dGVyUHJpbWFyeUNvbXBvbmVudCcpKTtcblxuLyoqXG4gKiBBIGxpc3Qgb2YgZGlyZWN0aXZlcy4gVG8gdXNlIHRoZSByb3V0ZXIgZGlyZWN0aXZlcyBsaWtlIHtAbGluayBSb3V0ZXJPdXRsZXR9IGFuZFxuICoge0BsaW5rIFJvdXRlckxpbmt9LCBhZGQgdGhpcyB0byB5b3VyIGBkaXJlY3RpdmVzYCBhcnJheSBpbiB0aGUge0BsaW5rIFZpZXd9IGRlY29yYXRvciBvZiB5b3VyXG4gKiBjb21wb25lbnQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2lSVVA4QjVPVWJ4Q1dRM0FjSURtKSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9hbmd1bGFyMic7XG4gKiBpbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBST1VURVJfUFJPVklERVJTLCBSb3V0ZUNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgey4uLn0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHtcbiAqICAgIC8vIC4uLlxuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFtST1VURVJfUFJPVklERVJTXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9ESVJFQ1RJVkVTOiBhbnlbXSA9IENPTlNUX0VYUFIoW1JvdXRlck91dGxldCwgUm91dGVyTGlua10pO1xuXG4vKipcbiAqIEEgbGlzdCBvZiB7QGxpbmsgUHJvdmlkZXJ9cy4gVG8gdXNlIHRoZSByb3V0ZXIsIHlvdSBtdXN0IGFkZCB0aGlzIHRvIHlvdXIgYXBwbGljYXRpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2lSVVA4QjVPVWJ4Q1dRM0FjSURtKSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9hbmd1bGFyMic7XG4gKiBpbXBvcnQge1xuICogICBST1VURVJfRElSRUNUSVZFUyxcbiAqICAgUk9VVEVSX1BST1ZJREVSUyxcbiAqICAgUm91dGVDb25maWdcbiAqIH0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgey4uLn0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHtcbiAqICAgLy8gLi4uXG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1JPVVRFUl9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX1BST1ZJREVSUzogYW55W10gPSBDT05TVF9FWFBSKFtcbiAgUm91dGVSZWdpc3RyeSxcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBQYXRoTG9jYXRpb25TdHJhdGVneX0pKSxcbiAgUGxhdGZvcm1Mb2NhdGlvbixcbiAgTG9jYXRpb24sXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgICAgUm91dGVyLFxuICAgICAge1xuICAgICAgICB1c2VGYWN0b3J5OiByb3V0ZXJGYWN0b3J5LFxuICAgICAgICBkZXBzOiBDT05TVF9FWFBSKFtSb3V0ZVJlZ2lzdHJ5LCBMb2NhdGlvbiwgUk9VVEVSX1BSSU1BUllfQ09NUE9ORU5ULCBBcHBsaWNhdGlvblJlZl0pXG4gICAgICB9KSksXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgICAgUk9VVEVSX1BSSU1BUllfQ09NUE9ORU5ULFxuICAgICAge3VzZUZhY3Rvcnk6IHJvdXRlclByaW1hcnlDb21wb25lbnRGYWN0b3J5LCBkZXBzOiBDT05TVF9FWFBSKFtBcHBsaWNhdGlvblJlZl0pfSkpXG5dKTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0JJTkRJTkdTID0gUk9VVEVSX1BST1ZJREVSUztcblxuZnVuY3Rpb24gcm91dGVyRmFjdG9yeShyZWdpc3RyeSwgbG9jYXRpb24sIHByaW1hcnlDb21wb25lbnQsIGFwcFJlZikge1xuICB2YXIgcm9vdFJvdXRlciA9IG5ldyBSb290Um91dGVyKHJlZ2lzdHJ5LCBsb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudCk7XG4gIGFwcFJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByb290Um91dGVyLmRpc3Bvc2UoKSk7XG4gIHJldHVybiByb290Um91dGVyO1xufVxuXG5mdW5jdGlvbiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeShhcHApIHtcbiAgaWYgKGFwcC5jb21wb25lbnRUeXBlcy5sZW5ndGggPT0gMCkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiQm9vdHN0cmFwIGF0IGxlYXN0IG9uZSBjb21wb25lbnQgYmVmb3JlIGluamVjdGluZyBSb3V0ZXIuXCIpO1xuICB9XG4gIHJldHVybiBhcHAuY29tcG9uZW50VHlwZXNbMF07XG59XG4iXX0=