const AdmZip = require('adm-zip')

// Ruta al archivo .zip que deseas descomprimir
const world = './public/models/world/world.zip'
const book ='./public/models/book/book.zip'
const key ='./public/models/world/key.zip'
const Crane = './public/models/world/Crane.zip'
const Dagger ='./public/models/world/Dagger.zip'
const Kratos ='./public/models/world/Kratos.zip'
const Shield = './public/models/world/Shield.zip'
const Sword ='./public/models/world/Sword.zip'
const Tiamat ='./public/models/world/Tiamat.zip'

// Ruta al directorio donde deseas extraer los archivos
const outputFolderPath = './public/models/world/'
const outputFolderPath2 = './public/models/book/'
const outputFolderPath3 = './public/models/world/'
const outputFolderPath4 = './public/models/world/'
const outputFolderPath5 = './public/models/world/'
const outputFolderPath6 = './public/models/world/'
const outputFolderPath7 = './public/models/world/'
const outputFolderPath8 = './public/models/world/'
const outputFolderPath9 = './public/models/world/'

const zip = new AdmZip(world)
zip.extractAllTo(outputFolderPath, true)

const zip2 = new AdmZip(book)
zip2.extractAllTo(outputFolderPath2, true)

const zip3 = new AdmZip(key)
zip3.extractAllTo(outputFolderPath3, true)

const zip4 = new AdmZip(Crane)
zip4.extractAllTo(outputFolderPath4, true)

const zip5 = new AdmZip(Dagger)
zip5.extractAllTo(outputFolderPath5, true)

const zip6 = new AdmZip(Kratos)
zip6.extractAllTo(outputFolderPath6, true)

const zip7 = new AdmZip(Shield)
zip7.extractAllTo(outputFolderPath7, true)

const zip8 = new AdmZip(Sword)
zip8.extractAllTo(outputFolderPath8, true)

const zip9 = new AdmZip(Tiamat)
zip9.extractAllTo(outputFolderPath9, true)

console.log('Archivo .zip descomprimido con éxito.')