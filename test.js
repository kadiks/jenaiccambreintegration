const Jimp = require('jimp');

(async () => {
    try {
        let latoPath = './assets/fonts/bitmapfonts/lato/Lato-Regular-16.fnt';
        let image = await Jimp.read('./assets/img/favicon.png');
        image = image.clone();
        let fontSite = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        let fontDate = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        let fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        image.resize(500, Jimp.AUTO);
        image.print(fontSite, 200, 30, "Self-help journal");
        image.print(fontDate, 200, 65, "Dec, 13th 2017");
        image.print(fontTitle, 200, 85, "Whenever you doubt, ask", 250);
        image.write("lena-half-bw.png");
    } catch (e) {
        console.log('Err e:', e);
    }
})();