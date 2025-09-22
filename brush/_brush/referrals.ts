import Cookies from "js-cookie";

const makeLoginRedirectUrl = (path?: string): string => {
  let returnTo = path || "";
  if (path === "") {
    const url = new URL(window.location.href);
    returnTo = `${url.pathname}${url.search}`;
  }

  returnTo = `${Shopify.routes.root}${returnTo}`.replace("//", "/");
  const redirectPath = `/customer_authentication/login?return_to=${encodeURIComponent(returnTo)}`;
  const currentUrl = new URL(window.location.href);

  return `${currentUrl.origin}${redirectPath}`;
};

class Referrer {
  cookieName = "brush_referrer";

  get(clear: boolean = true): string {
    const v = Cookies.get(this.cookieName) || Shopify.routes.root;
    if (clear) this.clear();
    return v;
  }

  set(url?: string): void {
    url = url || window.location.href;
    Cookies.set(this.cookieName, url);
  }

  clear(): void {
    Cookies.remove(this.cookieName);
  }
}

export default {
  makeLoginRedirectUrl,
  referrer: new Referrer(),
};
