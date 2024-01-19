import axios from "axios";
import cheerio from "cheerio";

/**
 El endpoint de github para obtener los seguidores no proporcionaba la cantidad de los mismos, por lo cual recurri a una tecnica de WebScrapping la cual me dejara seleccionar el elemento HTRML extacto y convertir el texto a numero, de esta manera uedo obtener la cantidad de seguidores de cualquier usuario sin necesidad de realizar multiples requests a la api de github 
*/

const convertFollowerCount = (followerCountText) => {
  const match = followerCountText.match(/([\d.]+)([kKmMbB]*)/);
  if (!match) return null;

  const count = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === "k") return count * 1000;
  if (unit === "m") return count * 1000000;
  if (unit === "b") return count * 1000000000;

  return count;
};

const getFollowerCount = async (username) => {
  try {
    const profileUrl = `https://github.com/${username}`;
    // Fetch the HTML content of the GitHub profile page
    const { data } = await axios.get(profileUrl);

    // Use Cheerio to parse the HTML content
    const $ = cheerio.load(data);

    // Find the element containing the follower count
    const followerElement = $(
      "a.Link--secondary.no-underline.no-wrap span.text-bold.color-fg-default:first"
    );

    // Extract the follower count text
    const followerCountText = followerElement.text().trim();

    // Convert the text to a number
    const followerCount = convertFollowerCount(followerCountText);

    // console.log(`${username}: ${followerCount} followers`);
    return followerCount;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default getFollowerCount;
