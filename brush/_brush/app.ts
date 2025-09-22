import Cookies from "js-cookie";

const COOKIE_NAME = "brush_version";

const checkAppVersion = () => {
  const script = document.querySelector<HTMLScriptElement>('script[src*="brush.js"]');
  if (!script) return;

  const url = new URL(script.src, window.location.origin);
  const version = url.searchParams.get("v") || "";
  const cookieVersion = Cookies.get(COOKIE_NAME) || "";
  const isNew = version !== cookieVersion;

  Brush.App.version = { id: version, isNew };
  Cookies.set(COOKIE_NAME, version);
};

export default {
  checkAppVersion,
  version: {
    id: "",
    isNew: true,
  },
};
