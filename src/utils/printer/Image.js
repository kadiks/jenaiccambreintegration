const path = require('path');
const Jimp = require('jimp');
const moment = require('moment');
require("moment/min/locales.min");
const DOMParser = require('xmldom').DOMParser;
const decode = require('unescape');
const Entities = require('html-entities').AllHtmlEntities;

const filterPosts = require('../filters/Post');

const SOCIAL_MEDIA_IMAGE_PATH = path.join(
    __dirname,
    "../../../assets/img/favicon.png"
);
const SITE_TITLE = {
    en: "Jénaïc Cambré's self-help journal",
    fr: "Journal de mon développement personnel"
};

class Image {
    async printSocialMediaCard({
        sourceImagePath = SOCIAL_MEDIA_IMAGE_PATH,
        post
    }) {
        const entities = new Entities();
        const isFrenchPost = filterPosts.isFrenchPost({ post });
        const language = isFrenchPost ? "fr" : "en";
        const dateFormat = filterPosts.getDateFormatLanguage({
            language,
        });

        moment.locale(language);

        // let title = new DOMParser().parseFromString(post.title, 'text/xml');
        // title = title.firstChild.textContent;
        const title = entities.decode(post.title);
        const date = moment(post.date).format(dateFormat);

        // console.log('utils/printer/Image#printSMC post', post);
        // console.log('utils/printer/Image#printSMC isFrenchPost', isFrenchPost);
        // console.log('utils/printer/Image#printSMC dateFormat', dateFormat);
        // console.log('utils/printer/Image#printSMC date', date);
        // console.log('utils/printer/Image#printSMC title', title);
        // console.log('utils/printer/Image#printSMC title', title.firstChild);
        // console.log('utils/printer/Image#printSMC title', title.firstChild.textContent);
        // console.log('utils/printer/Image#printSMC title', title.firstChild.Text);
        // console.log('utils/printer/Image#printSMC title', title.firstChild.Text.data);
        // console.log('utils/printer/Image#printSMC title', title.firstChild.Text.nodeValue);

        let image = await Jimp.read(sourceImagePath);
        image = image.clone();
        image.resize(500, Jimp.AUTO);

        const fontSite = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        const fontDate = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        image.resize(500, Jimp.AUTO);
        image.print(fontSite, 200, 30, SITE_TITLE[language]);
        image.print(fontDate, 200, 65, date);
        image.print(fontTitle, 200, 85, title, 250);

        image.write(path.join(
            __dirname, 
            `../../../public/static/${post.url}.png`
        ));
    }
}

module.exports = new Image();