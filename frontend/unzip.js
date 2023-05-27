const AdmZip = require('adm-zip')

// Ruta al archivo .zip que deseas descomprimir
const world = './public/models/world/world.zip'
const book ='./public/models/book/book.zip'

// Ruta al directorio donde deseas extraer los archivos
const outputFolderPath = './public/models/world/'
const outputFolderPath2 = './public/models/book/'

const zip = new AdmZip(world)
zip.extractAllTo(outputFolderPath, true)

const zip2 = new AdmZip(book)
zip2.extractAllTo(outputFolderPath2, true)

console.log('Archivo .zip descomprimido con éxito.')
