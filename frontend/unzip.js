const AdmZip = require('adm-zip')

// Ruta al archivo .zip que deseas descomprimir
const world = './public/models/world/world.zip'

// Ruta al directorio donde deseas extraer los archivos
const outputFolderPath = './public/models/world/'

const zip = new AdmZip(world)
zip.extractAllTo(outputFolderPath, true)

console.log('Archivo .zip descomprimido con éxito.')
