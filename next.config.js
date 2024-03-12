
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
  locales: ["en"],
  defaultLocale: "en",
  },
  async headers(){
  return[
    {
    source:"/gun/:slug",
    headers:[
      {
      key:"Origin",
      value:"http://localhost:3000"
      },
      {
      key:'Access-Control-Allow-Origin',
      value:'https://steamcommunity.com'
      },
      {
      key:"Access-Control-Allow-Credentials",
      value:"true"
      },
      {
      key:"Access-Control-Allow-Methods",
      value:"GET,DELETE,PATCH,POST,PUT"
      },
      {
      key:"Access-Control-Allow-Headers",
      value:"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      }
    ]
    }
  ]
  }
};
export default config;
