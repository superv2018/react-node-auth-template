export default ({ markup, css}) => {
    return `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <title>MERN Skeleton</title>
            <style> a { text-decoration: none}</style>
        </head>
        <body style="margin:0">
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script type="text/javascript" src="dist/bundle.js">
            </script>
        </body>
        </html>
    `

}