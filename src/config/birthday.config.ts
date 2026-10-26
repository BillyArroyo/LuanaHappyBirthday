import type { BirthdayConfig } from './types';

export const birthdayConfig: BirthdayConfig = {
  name: 'Luana',
  secondName: 'Reichel',
  surname: 'Arroyo Ramírez',
  age: 13,
  favoriteSong: {
    audio: 'someday',
    title: 'Someday',
    artist: 'Meg Donnelly y Milo Manheim · ZOMBIES',
  },

  voiceMessage: {
    title: 'Escucha esto antes de seguir',
  },

  worlds: [
    {
      id: 'zombies',
      tag: 'Zombies',
      title: 'Saludos desde Seabrook',
      subtitle: 'Donde ser diferente es lo más bonito que hay.',
      panel: { bubble: '¡Feliz cumple desde Seabrook, Luana!', sfx: '¡ZAP!', photos: ['02', 'addison'] },
      speakers: [
        {
          name: 'Zed',
          role: 'Desde la Zona Zombie',
          photo: 'zed',
          message: '¡Luana! Aquí Zed. Dicen que los zombies no celebran cumpleaños, pero por ti hacemos una excepción. Que tus 13 sean tan épicos como ganar el partido en el último segundo. ¡Feliz cumple!',
        },
        {
          name: 'Addison',
          role: 'Capitana de porristas',
          photo: 'addison',
          message: '¡Dame una L, dame una U, dame una A, N, A! ¡Luana! Hoy todo el equipo grita por ti. Nunca dejes de ser tú, porque lo diferente es lo que más brilla. ¡Feliz cumpleaños!',
        },
      ],
    },
    {
      id: 'descendientes',
      tag: 'Descendientes',
      title: 'Un mensaje desde Auradon',
      subtitle: 'Un poquito villana, un poquito princesa.',
      panel: { bubble: 'Hoy tú eres la reina, Luana.', sfx: '¡PUFF!', photos: ['03', 'mal'] },
      speakers: [
        {
          name: 'Mal',
          role: 'Desde la Isla de los Perdidos',
          photo: 'mal',
          message: 'Hola, Luana. Soy Mal. Te cuento un secreto: un poquito de magia y un poquito de rebeldía son la mezcla perfecta. Hoy eres la reina de tu propio reino. ¡Feliz cumpleaños!',
        },
        {
          name: 'Evie',
          role: 'Diseñadora real',
          photo: 'evie',
          message: '¡Luana, querida! Ya te diseñé un vestido de cumpleaños en mi cabeza. Recuerda siempre que eres bonita por dentro y por fuera. ¡Que tu día sea mágico!',
        },
      ],
    },
    {
      id: 'billie',
      tag: 'Billie Eilish',
      title: 'Si Billie te escribiera…',
      subtitle: 'Dedicatoria de fan, hecha con cariño.',
      panel: { bubble: '♪ Birds of a Feather ♪', sfx: '♥', photos: ['06', 'billie'] },
      song: {
        title: 'Birds of a Feather',
        artist: 'Billie Eilish',
        audio: 'birds-of-a-feather',
      },
      speakers: [
        {
          name: 'Billie',
          role: 'Imaginando su mensaje',
          photo: 'billie',
          message: 'Hey, Luana. Happy birthday. Los 13 son bonitos y un poco raros a la vez, y está bien sentirlo todo. Rodéate de gente que vuele contigo, como pájaros de la misma pluma.',
        },
      ],
    },
    {
      id: 'sabrina',
      tag: 'Sabrina Carpenter',
      title: 'Si Sabrina te escribiera…',
      subtitle: 'Dedicatoria de fan, hecha con cariño.',
      panel: { bubble: '♪ Please Please Please ♪', sfx: '¡WOW!', photos: ['03', 'sabrina'] },
      song: {
        title: 'Please Please Please',
        artist: 'Sabrina Carpenter',
        audio: 'please-please-please',
      },
      speakers: [
        {
          name: 'Sabrina',
          role: 'Imaginando su mensaje',
          photo: 'sabrina',
          message: '¡Luana! Feliz cumple, bestie. Solo te pido una cosa, please, please, please: no dejes que nadie apague tu brillo. Ponte tu mejor lazo y a celebrar.',
        },
      ],
    },
    {
      id: 'fede',
      tag: 'Fede Vigevani',
      title: 'Si Fede te escribiera…',
      subtitle: 'Dedicatoria de fan, hecha con cariño.',
      panel: { bubble: '¡Feliz cumple, Luana!', sfx: '¡JA!', photos: ['01'] },
      videoShelf: {
        title: 'La saga de los Backrooms',
        videos: [
          { youtubeId: '39nyg8-MYtY', title: 'Descubrí la entrada de los Backrooms' },
          { youtubeId: 'IZ0OHHDKx5U', title: 'Bajé a los Backrooms' },
          { youtubeId: 'ZQqAzwEDxmg', title: 'Mi amigo entró a los Backrooms' },
          { youtubeId: 'Pj_2OIZkucM', title: 'Bajé con vecinos y Club Misterio a los Backrooms' },
          { youtubeId: 'q6gR0ObaROU', title: 'Conocí los nuevos Backrooms' },
          { youtubeId: 'PhC4A2eiGfQ', title: 'Encontré una persona viviendo en los Backrooms' },
          { youtubeId: '4P5ynrpTuQI', title: 'Volví a los Backrooms' },
        ],
      },
      speakers: [
        {
          name: 'Fede',
          role: 'Imaginando su mensaje',
          photo: '02',
          message: '¡Holaaa, Luana! Me contaron que hoy cumplís 13 y no podía no pasar a saludarte. Que este año te rías tanto que te duela la panza, que hagas mil videos con tus amigas y que nunca te dé vergüenza ser como sos. ¡Feliz cumple!',
        },
      ],
    },
  ],

  wishes: [
    'Que nunca dejes de ser tú misma.',
    'Que tu playlist siempre tenga la canción perfecta.',
    'Muchas pijamadas y maratones de películas.',
    'Amigas que te cuiden como un equipo de porristas.',
    'Valentía para todo lo nuevo que viene.',
    'Que te rías hasta que te duela la panza.',
    'Ver a Billie o a Sabrina en concierto algún día.',
    'Que te vaya increíble en el colegio.',
    'Mucha paz en los días difíciles.',
    'Que cumplas cada sueño que tengas.',
    'Un año lleno de abrazos.',
    'Que brilles más que cualquier estrella.',
    'Que sepas siempre lo mucho que te queremos.',
  ],

  family: {
    title: 'Amo a toda mi familia',
    lead: 'Y a ti también, Luana, mi reina. Ustedes son mi casa y lo más bonito que tengo.',
    promise: 'Por ustedes daría mi vida.',
    signature: 'Hoy, mañana y siempre. — Billy',
  },

  letter: {
    title: 'Para ti, Luana',
    paragraphs: [
      'Hoy cumples 13 y no puedo creer lo rápido que creciste. Eres valiente, divertida y tienes un corazón enorme.',
      'Quiero que sepas que siempre voy a estar para ti, en los días bonitos y en los que no tanto. Disfruta tu día al máximo, te lo mereces.',
    ],
    signature: 'Tu hermano, Billy',
  },

  favoritePhoto: {
    folder: 'familia',
    photo: '07',
    kicker: 'Mi foto favorita',
    title: 'La foto favorita de tu hermano',
    caption: 'Esta sonrisa es mi foto favorita de todas. Nunca la pierdas, Luana.',
  },
};
