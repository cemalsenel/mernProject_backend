const verify = (title, link) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <title>Title of the document</title>
    </head>
    
    <body>
        <form action=${link}>
            <button type="submit">${title}</button>
        </form>
    </body>
    
    </html>`
}

module.exports = verify;