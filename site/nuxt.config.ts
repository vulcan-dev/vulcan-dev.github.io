// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            BACKEND_URL: process.env.NODE_ENV === "production" ? "https://vkservers.com" : "http://localhost:8080",
        }
    },
    target: "static",
    router: {
        base: "/"
    },
    pages: true,
    app: {
        head: {
            title: "Daniel W.",
            viewport: "width=device-width, initial-scale=1",
            charset: "utf-8",
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
            ]
        }
    }
})
