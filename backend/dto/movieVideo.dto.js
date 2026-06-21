module.exports = class MovieVideoDto {
    id;
    youtubeKey; // Frontendga to'g'ridan-to'g'ri video kalitini uzatamiz

    constructor(data) {
        this.id = data.id;
        
        // Videolar ichidan eng mos keladigan YouTube treylerini topamiz
        const trailer = data.results?.find(
            vid => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
        ) || data.results?.[0];

        this.youtubeKey = trailer ? trailer.key : null;
    }
}