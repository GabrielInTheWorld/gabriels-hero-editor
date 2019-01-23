/**
 * Class Route to define the routes.
 */
export class Route {

  /**
   * This is the title of the route.
   */
  title?: string;

  /**
   * This is the path of the route, where it should navigate to.
   */
  path: string;

  /**
   * This is the link - necessary for the anchor-elements.
   */
  link?: string;

  /**
   * Optional. An icon for the route can be set.
   */
  icon?: string;

  /**
   * This is the component which will be rendered, when the route is called.
   */
  component?: any;

  /**
   * Optional: If the route should redirect to another URL.
   */
  redirectTo?: string;

  /**
   * Optional: If the route has no component and should only redirect to another URL.
   */
  pathMatch?: string;

  /**
   * Constructor
   * @param title The title
   * @param link The link
   * @param path The path
   * @param icon The icon
   */
  constructor(title: string, link: string, path: string, icon: string) {
    this.title = title;
    this.link = link;
    this.path = path;
    this.icon = icon;
  }
}
