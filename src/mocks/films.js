import Utils from '../common/utils';
import React from "react";

const description = {
    text: (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`).split(`.`),
    amount: {
        min: 1,
        max: 3
    }
};

const names = [
    `Die Hard`,
    `The Transporter`,
    `The Dark Knight`,
    `The Bourne Identity`,
    `James Bond: Casino Royale`
];

const posters = [
    `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    `bohemian-rhapsody.jpg`,
    `snatch.jpg`,
    `macbeth.jpg`,
    `aviator.jpg`
];

const genres = [
    'Comedies',
    'Crime',
    'Documentary',
    'Dramas',
    'Horror',
    'Kids & Family',
    'Romance',
    'Sci-Fi',
    'Thrillers'
];

const mounts = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
};

// const generateCommentsTemplate = () => ({
//     avatar: Utils.getRandomElementArr([`smile.png`, `sleeping.png`, `sleeping.png`, `angry.png`]),
//     name: Utils.getRandomElementArr([`Tim Macoveev`, `John Doe`, `Peter Parker`, `Bruce Wayne`]),
//     preview: Utils.getRandomElementArr([`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`]),
//     day: `${Utils.generateRandomInt(1, 5)} days ago`
// });

// const generateComments = (films) => {
//     const comments = films.map((it) => Object.assign({ id: Utils.generateId(`comment`) }, generateCommentsTemplate()));
//     return comments.splice(Utils.getRandomIndexArr(comments), Utils.generateRandomInt(0, comments.length));
// };

const generateFilm = (film) => {
    return {
        id: Utils.generateId(film),
        name: film,
        poster: Utils.getRandomElementArr(posters),
        country: `USA`,
        description: description.text.slice(0, Utils.generateRandomInt(description.amount.min, description.amount.max)).join(`.`),
        preview: Utils.getRandomElementArr(['https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4', 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm']),
        duration: {
            hours: Utils.generateRandomInt(1, 2),
            minutes: Utils.generateRandomInt(0, 59),
        },
        starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
        genre: Utils.getRandomElementArr(genres),
        release: {
            year: Utils.generateRandomInt(1984, 2020),
            numberMonths: Utils.generateRandomInt(1, mounts[Utils.getRandomElementArr(Object.keys(mounts))]),
            month: Utils.getRandomElementArr(Object.keys(mounts))
        },
        isFavorite: Utils.getRandomBoolean(),
        isWatched: Utils.getRandomBoolean(),
        isWatchListAdded: Utils.getRandomBoolean(),
        rating: `${Utils.generateRandomInt(1, 9)}.${Utils.generateRandomInt(1, 9)}`,
        // comments: generateComments(names)
    };
};

const generateFilms = (films) => films.map(generateFilm);

const films = generateFilms(names);

export { films };
