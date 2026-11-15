# surf-fin-designer
Parametric Surfboard Fin Designer

## Idiomas / Languages / Sprachen
La interfaz está disponible en español, italiano y alemán (selector ES · IT · DE en la barra superior).
Todos los textos están en `i18n.js` (`"clave": [alemán, español, italiano]`). En el HTML se usan los atributos
`data-i18n`, `data-i18n-html`, `data-i18n-alt`, `data-i18n-title` y `data-i18n-aria`; en JS, `window.I18N.t("clave")`.
El idioma elegido se guarda en el navegador y también se puede forzar con `?lang=es|it|de`.
