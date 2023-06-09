const stickers = [
  {
    stickerId: 1,
    page: 5,
    texture: '/img/world/Pitagoras.jpg',
    text: 'Pitágoras quería representar toda la realidad usando matemáticas, lo que lo llevó a inventar el teorema de Pitágoras y descubrir los intervalos musicales.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 2,
    page: 5,
    texture: '/img/world/SofistasAI.jpeg',
    text: 'Los sofistas creían que el saber se debía transmitir a través del convencimiento. Eran egocéntricos, cobraban por sus clases y defendían que la verdad era relativa.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 3,
    page: 5,
    texture: '/img/world/Socrates.jpg',
    text: 'Sócrates creía que el saber se debía transmitir a través del diálogo. Se reconocía como ignorante, sus clases eran gratuitas y creía que la verdad era absoluta y estaba dentro de nosotros.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 4,
    page: 5,
    texture: '/img/world/Platon.jpg',
    text: 'Platón fue el fundador de la teoría de las Ideas, la cual consiste en que existen dos mundos: el tangible y el de las Ideas. Decía que el mundo tangible era nada más que una copia del original (el de las Ideas).',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 5,
    page: 6,
    texture: '/img/world/HomeroAI.jpg',
    text: 'Homero es el poeta al que se le atribuyen "La Ilíada" y "La Odisea"; sin embargo, muchos piensan que ni siquiera existió debido a muchas incongruencias en sus obras, por lo que es casi una leyenda.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 6,
    page: 6,
    texture: '/img/world/Pericles.jpg',
    text: 'Pericles gobernó Atenas mientras vivían filósofos importantes como Sócrates y Protágoras. Durante su mandato, Atenas tuvo un florecimiento cultural y se consolidó la democracia',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 7,
    page: 6,
    texture: '/img/world/Fidias.jpg',
    text: 'Fidias fue un escultor sumamente famoso de la época de Pericles. Se le atribuyen obras hermosas como la Atenea Partenos y la efigie de Zeus. Es un personaje del cual sabemos muy poco, pero disfrutamos de su arte',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 8,
    page: 6,
    texture: '/img/world/MagnoAI.jpg',
    text: 'Alejandro Magno fue el mayor conquistador de la antigua Grecia, y en gran parte gracias a él comenzó la era del "Mundo Helenístico". Se llamaba a sí mismo el hijo de Zeus y se creía un semidiós.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 9,
    page: 8,
    texture: '/img/world/Agora.jpg',
    text: 'El ágora es el conjunto de espacios urbanos que se crearon como centros sociales, políticos y administrativos propios de las ciudades de la antigua Grecia.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 10,
    page: 8,
    texture: '/img/world/Bouleterion.jpg',
    text: 'El bouleterion es la sede donde el boulé, el consejo, en las ciudades de la antigua Grecia, se reunía.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 11,
    page: 8,
    texture: '/img/world/Stoa.jpeg',
    text: 'La Stoa se trata de un gran porche con una larga y esbelta columnata, que se encuentra en el ágora y en otros espacios públicos de las ciudades de la antigua Grecia con el fin de proteger a los peatones de las condiciones climatológicas. Además de ofrecer refugio para las tiendas y el libre comercio entre los ciudadanos.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 12,
    page: 9,
    texture: '/img/world/estadio.jpg',
    text: 'Los estadios griegos se utilizaron para acontecimientos deportivos. Su estructura era alargada, con escalones que se apoyaban en la falda de una colina, aunque no siempre fue así. El estadio más antiguo del mundo se encuentra en Olimpia, en el Peloponeso. ',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 13,
    page: 9,
    texture: '/img/world/teatro.jpg',
    text: 'Los teatros griegos se diseñaban cuidadosamente para garantizar una buena acústica. La forma semicircular del teatro y el uso de materiales como piedra caliza ayudaban a amplificar y proyectar el sonido.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 14,
    page: 9,
    texture: '/img/world/Propileo.jpg',
    text: 'Los propileos son construcciones monumentales generalmente constituidos de columnas griegas y formas complejas, que funcionaban como puertas de entrada a un edificio, templo o recinto.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 15,
    page: 9,
    texture: '/img/world/Erecteion.jpg',
    text: 'Situado en la Acrópolis de Atenas, el Erecteión es un templo griego erigido en el lado norte de la Acrópolis de Atenas en honor a Atenea Polias, Poseidón y Erecteo, el rey mítico de la ciudad',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 16,
    page: 10,
    texture: '/img/world/Mausoleo.jpg',
    text: 'El Mausoleo de Halicarnaso fue un monumento funerario suntuoso construido entre el año 353 a.C. y el 350 a.C. en Halicarnaso (actualmente Bodrum, Turquía) para Mausolo, un sátrapa del Imperio persa. La estructura fue encargada por su esposa y hermana, Artemisia II de Caria, a los arquitectos griegos Sátiro de Paros y Piteo.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 17,
    page: 10,
    texture: '/img/world/Templo_Zeus.jpg',
    text: 'El templo de Zeus es el mayor templo de todo el Peloponeso, las dimensiones alcanzan un área de 64,12 por 27,68 metros. Fue construido por el arquitecto Libón de Élide en el Siglo V a.C. (entre los años 470 - 457 a.C.) en honor de Zeus Olímpico con el botín conseguido por los Eleos en la Guerra contra Pisa y Trifilia.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 18,
    page: 10,
    texture: '/img/world/Templo_Artemisa.jpg',
    text: 'El Templo de Artemisa fue un templo ubicado en la ciudad de Éfeso, Turquía, dedicado a la diosa Artemisa. De grandes dimensiones y una bella y delicada arquitectura, es considerada una de las Siete Maravillas del Mundo Antiguo.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 19,
    page: 10,
    texture: '/img/world/Templo_Poseidon.jpg',
    text: 'El antiguo templo griego de Poseidón en el cabo Sunio, construido entre 444–440 a. C., es uno de los principales monumentos de la Edad de Oro de Atenas. El templo de Poseidón que podemos apreciar hoy en día es una reconstrucción realizada durante el periodo clásico.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 20,
    page: 12,
    texture: '/img/world/greekOven.jpg',
    text: 'Los antiguos griegos utilizaban diversos tipos de hornos de arcilla en forma de cúpula para cocinar pan, pasteles, carnes, pescados y platos al horno con queso y verduras, calentados mediante la quema de madera u otros combustibles.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 21,
    page: 12,
    texture: '/img/world/alquimedesPalanca.jpg',
    text: 'La palanca de Arquímedes, ilustrada por su famoso dicho "Dame un punto de apoyo y moveré el mundo", permite obtener una gran ventaja mecánica mediante el uso adecuado de un punto de apoyo. Se cree que Arquímedes la utilizó para mover objetos pesados y en la construcción',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 22,
    page: 12,
    texture: '/img/world/greekCemento.jpg',
    text: 'Los antiguos griegos utilizaron una técnica de construcción llamada "opus caementicium" que involucraba el uso de piedras y un mortero compuesto por cal apagada, arena y agua que se empleaba para unir las piedras y crear estructuras sólidas.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 23,
    page: 12,
    texture: '/img/world/arotron.jpg',
    text: 'El arotron era un arado utilizado por los griegos para labrar y preparar la tierra. Tirado por bueyes o mulas, su hoja de hierro se adentraba en el suelo, volteándolo y rompiéndolo, facilitando la siembra. Ayudaba a controlar malas hierbas y residuos de cultivos anteriores',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 24,
    page: 13,
    texture: '/img/world/alquimedesTornillo.png',
    text: 'El tornillo de Arquímedes fue un invento ingenioso desarrollado por Arquímedes. Se trataba de un dispositivo que consistía en una hélice o tornillo colocada dentro de un cilindro. El tornillo de Arquímedes se utilizó principalmente para elevar agua de un nivel inferior a uno superior.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 25,
    page: 13,
    texture: '/img/world/greekSwords.jpg',
    text: 'Conocidas como xiphos, eran armas con una hoja recta de doble filo y un tamaño moderado. Fabricadas con acero, ofrecían una gran capacidad de corte. La empuñadura, hecha de madera, hueso o marfil, estaba envuelta en cuero o tela. Algunas espadas tenían una guarda en forma de cruz para proteger la mano.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 26,
    page: 13,
    texture: '/img/world/bow.jpg',
    text: 'Los arcos griegos eran armas de tiro recurvadas utilizadas en la antigua Grecia. Hechos de madera laminada con tendones y cuero, estos arcos al ser curvos almacenaban energía al flexionarse, lo que les daba mayor potencia y alcance en comparación con los arcos rectos.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 27,
    page: 13,
    texture: '/img/world/Martillo.jpg',
    text: 'En la escultura, los artistas griegos utilizaban el martillo y cincel para esculpir detalles finos y precisos en la piedra o el mármol. Golpeando cuidadosamente el cincel con el martillo, podían tallar formas y crear texturas según su visión artística.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 24,
    page: 15,
    texture: '/img/world/300.jpg',
    text: '300 Es una pelicula del 2007 que depicta la guerra entre espartanos y persas, en ella se logra contemplar un poco de la cultura griega, sus estrategias militares y, por supuesto, mucha accion.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 25,
    page: 15,
    texture: '/img/world/ClashofTitans.jpg',
    text: 'Choque de Titanes es una pelicula del 2010 acerca de una guerra entre los dioses del olimpo, y la historia de como el hijo de Zeus se ve obligado a luchar para salvar el mundo.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 26,
    page: 15,
    texture: '/img/world/PercyJackson.jpg',
    text: 'Percy Jackson es el personaje principal de una serie de libros y peliculas que cuentan su historia desde su juventud en las cuales tiene muchas aventuras y lucha contra muchos monstruos gracias a ser el hijo de Poseidon.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 27,
    page: 15,
    texture: '/img/world/HerculesMovie.jpg',
    text: 'Hercules es una pelicula de Disney, estrenada en el 1997, que trata acerca de las aventuras por las que tiene que pasar Hercules al intentar recuperar su puesto en el Olimpo despues de haber sido secuestrado de bebe.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
  {
    stickerId: 24,
    page: 16,
    texture: '/img/world/LaOdisea.jpg',
    text: 'La Odisea es un poema epico del casi legendario Homero, que narra la historia del heroe griego Ulises, quien se suponia debia regresar junto a su esposa e hijo despues de un viaje de un mes, que se convirtio en una odisea de 10 años.',
    textColor: 'Black',
    position: [0.875, -0.65, -0.25],
  },
  {
    stickerId: 25,
    page: 16,
    texture: '/img/world/LaIliada.jpg',
    text: 'La Iliada es un poema epico del casi legendario Homero, que narra el asedio de la ciudad de Troya para rescatar a Helena, quien habia sido raptada por un principe troyano, esta es la obra que narra la historia del caballo de Troya.',
    textColor: 'Black',
    position: [0.875, 0.35, -0.25],
  },
  {
    stickerId: 26,
    page: 16,
    texture: '/img/world/HadesGame.jpg',
    text: 'Hades es un videojuego tipo roguelite en el que juegas como Zagreus, hijo de Hades, y donde tu objetivo es buscar la ayuda de los dioses para lograr derrotar a todos los enemigos que te impiden escapar del inframundo, incluido tu propio padre.',
    textColor: 'Black',
    position: [-0.875, -0.65, -0.25],
  },
  {
    stickerId: 27,
    page: 16,
    texture: '/img/world/GodofWar.jpg',
    text: 'God of War son una serie de videojuegos en los que puedes disfrutar de la historia de Kratos, viviendo sus experiencias tragicas y llenas de accion mientras buscas apaciguar la culpa que siente debido a las decisiones que ha tomado.',
    textColor: 'Black',
    position: [-0.875, 0.35, -0.25],
  },
]

export { stickers }
