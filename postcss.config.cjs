// CommonJS PostCSS config for toolchains running under "type": "module" projects.
// Using the separate PostCSS plugin package required by Tailwind v4.
module.exports = {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
}