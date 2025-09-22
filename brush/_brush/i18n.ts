import i18next from "i18next";

const init = async () => {
  const key = `brush-i18n-${Shopify.locale}`;
  let translations =
    (!Brush.App.version.isNew && localStorage.getItem(key)) || (await ggtFetch(`/apps/brush/i18n`));

  const parsed = typeof translations === "string" ? JSON.parse(translations) : translations || {};

  await i18next.init({
    lng: Shopify.locale,
    resources: { [Shopify.locale]: { translation: parsed } },
  });

  localStorage.setItem(key, JSON.stringify(parsed));
  window.$t = i18next.t;
};

const formatPrice = (value: number): string => {
  return new Intl.NumberFormat(`${Shopify.locale}-${Shopify.country}`, {
    style: "currency",
    currency: Shopify.currency.active,
  }).format(value);
};

export default { init, formatPrice };
