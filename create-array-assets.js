const fs = require('fs')

const directories = [
    './public',
    './public/assets/css',
    './public/assets/fonts',
    './public/assets/images'
]

const files = []

directories.forEach(async (directory, index) => {
    
    const _files = await fs.promises.readdir(directory)

    _files.forEach(f => files.push(`${directory.replace('./public', '')}/${f}`))

    if (index === directories.length - 1) {
        
        fs.writeFile('assets.js', `const urlsToCache = ${JSON.stringify(files, null, "\t")}`, err => {
            if (err) throw err
            console.log('Saved!')
        })

    }

})
