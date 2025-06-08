const apiKey = process.env.OMDB_API_KEY;

export const generateURL = seasonId =>
  `http://www.omdbapi.com/?i=tt0092455&apikey=${apiKey}&season=${seasonId}&ref_=tt_eps_sn_${seasonId}`;
